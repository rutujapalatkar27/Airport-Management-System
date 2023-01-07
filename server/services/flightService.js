import {connection} from  '../index.js';
import {parseRowDataPacket} from './parsingService.js';


class FlightService {
    addFlight = async (flight) => {
        try{
        const {
            id: flight_id,
            flight_number, 
            airline_id, 
            status,
            source,
            destination,
            time_of_flight,
            bagCarousel,
        } = flight;
    
        let flightUpdateQuery = `UPDATE flight SET
            flight_number = '${flight_number}',
            airline_id = '${airline_id}',
            status = '${status}',
            destination = '${destination}',
            time_of_flight = '${time_of_flight}',
            bagCarousel = ${bagCarousel}
            WHERE id = ${flight_id};
        `;
        let flightAddQuery = `INSERT INTO flight (
            id,
            flight_number,
            airline_id,
            status,
            source,
            destination,
            time_of_flight) VALUES (${null}, '${flight_number}', '${airline_id}', '${status}', '${source}', '${destination}', '${time_of_flight}' )
        `;
    
        if(flight_id){ //update
        let getFlightByIdQuery = `SELECT * FROM flight WHERE id = ${flight_id};`;
            const response = await connection.query(flightUpdateQuery);
            const insertedObject = await connection.query(getFlightByIdQuery);
            const result = parseRowDataPacket(insertedObject);
    
            return {
            success: true,
            data: result[0]
            };
        }
        else{ //add
            const response = await connection.query(flightAddQuery);
            let getFlightByIdQuery = `SELECT * FROM flight WHERE id = ${response.insertId};`;
            const insertedObject = await connection.query(getFlightByIdQuery);
            const result = parseRowDataPacket(insertedObject);
            return {
            success: true,
            data: result[0]
            };
        }
        }
        catch(e){
        console.log(e);
        return {
            success: false,
            message:  e.message
        }
        }
    }
    getFlightList = async () =>{ 
      const getProjectsBasedOnId = `SELECT * FROM flight`;
      try{
        const response = await  connection.query(getProjectsBasedOnId);
        const parsedResponse = parseRowDataPacket(response);
    
        return{
          success: true,
          data: parsedResponse
        }
      }
      catch(e){
        console.log(e);
        console.log(parsedResponse)
        return{
          success: false,
          message: e.message
        }
      }
    }
    
    getFlightListBasedOnAirline = async ({airlineId}) => {
      const getFlightListBasedOnAirlineQuery = `select f.id as id,gt.gate as gate,a.name as airline,
      flight_number,f.status as status,
      f.source as source,f.destination as destination,f.time_of_flight as time_of_flight,
      c.carousel_number as bagCarousel, terminal 
      from flight f join airline a on f.airline_id = a.id 
      left join (select g.gate as gate,t.terminal as terminal, g.assigned as fassigned from gate g join terminal t on g.terminal=t.id) as gt
       on  f.id = gt.fassigned 
      left join carousel c on f.bagCarousel = c.id
      where time_of_flight >= CONVERT_TZ(current_timestamp(), 'GMT', 'US/Pacific')
      and a.id = ${airlineId}`

      try{
        const response = await connection.query(getFlightListBasedOnAirlineQuery);
        const parsedResponse = parseRowDataPacket(response);

        return{
          success: true,
          data: parsedResponse
        }
      }
      catch(e){
        console.log(e);
        return{
          success: false,
          message: e.message
        }
      }
    }

    getFlightListBasedOnTimeAndStatus = async ({interval, status}) => {
      let getArrivalFlightListBasedOnTimeQuery;
      if(parseInt(interval) === 1){ 

        getArrivalFlightListBasedOnTimeQuery = `select f.id as id,gt.gate as gate,a.name as airline,
        flight_number,f.status as status,
        f.source as source,f.destination as destination,f.time_of_flight as time_of_flight,
        c.carousel_number as bagCarousel, terminal 
        from flight f join airline a on f.airline_id = a.id 
        left join (select g.gate as gate,t.terminal as terminal, g.assigned as fassigned from gate g join terminal t on g.terminal=t.id) as gt
         on  f.id = gt.fassigned 
        left join carousel c on f.bagCarousel = c.id
        where time_of_flight >= CONVERT_TZ(current_timestamp(), 'GMT', 'US/Pacific')
        and time_of_flight <= DATE_ADD(CONVERT_TZ(current_timestamp(), 'GMT', 'US/Pacific'),interval 1 hour)
        and f.status = '${status}'`
      }
      else if(parseInt(interval) === 2){
        getArrivalFlightListBasedOnTimeQuery = `select f.id as id,gt.gate as gate,a.name as airline,
        flight_number,f.status as status,
        f.source as source,f.destination as destination,f.time_of_flight as time_of_flight,
        c.carousel_number as bagCarousel, terminal 
        from flight f join airline a on f.airline_id = a.id 
        left join (select g.gate as gate,t.terminal as terminal, g.assigned as fassigned from gate g join terminal t on g.terminal=t.id) as gt
        on  f.id = gt.fassigned 
        left join carousel c on f.bagCarousel = c.id
        where time_of_flight >= CONVERT_TZ(current_timestamp(), 'GMT', 'US/Pacific')
        and time_of_flight <= DATE_ADD(CONVERT_TZ(current_timestamp(), 'GMT', 'US/Pacific'),interval 2 hour)
        and time_of_flight >= DATE_ADD(CONVERT_TZ(current_timestamp(), 'GMT', 'US/Pacific'),interval 1 hour)
        and f.status = '${status}'
          `
      }
      else{
        getArrivalFlightListBasedOnTimeQuery = `select f.id as id,gt.gate as gate,a.name as airline,
        flight_number,f.status as status,
        f.source as source,f.destination as destination,f.time_of_flight as time_of_flight,
        c.carousel_number as bagCarousel, terminal 
        from flight f join airline a on f.airline_id = a.id 
        left join (select g.gate as gate,t.terminal as terminal, g.assigned as fassigned from gate g join terminal t on g.terminal=t.id) as gt
        on  f.id = gt.fassigned 
        left join carousel c on f.bagCarousel = c.id
        where time_of_flight >= CONVERT_TZ(current_timestamp(), 'GMT', 'US/Pacific')
        and time_of_flight <= DATE_ADD(CONVERT_TZ(current_timestamp(), 'GMT', 'US/Pacific'),interval 4 hour)
        and time_of_flight >= DATE_ADD(CONVERT_TZ(current_timestamp(), 'GMT', 'US/Pacific'),interval 2 hour)
        and f.status = '${status}'
          `
      }
      try{
        const response = await connection.query(getArrivalFlightListBasedOnTimeQuery);
        const parsedResponse = parseRowDataPacket(response);

        return{
          success: true,
          data: parsedResponse
        }
      }
      catch(e){
        console.log(e);
        return{
          success: false,
          message: e.message
        }
      }
    }

    geFlightDetailsById = async ({id: flightId}) => {
      try{
        const getFlightDetailsByIdQuery = `select * from flight where id = ${flightId};`
        const response = await connection.query(getFlightDetailsByIdQuery);
        const parsedResponse = parseRowDataPacket(response);

        return{
          success: true,
          data: parsedResponse
        }
      }
      catch(e){
        console.log(e);
        return {
          success: false, 
          message: e.message
        }
      }
    }

    getArrivalFlightListBasedOnBaggageCarousel = async () => {
      try{
        const getArrivalFlightListBasedOnBaggageCarouselQuery = `select f.id as id, flight_number, status, source, destination, time_of_flight, a.name as airline 
        from flight as f join airline as a
        on f.airline_id = a.id where status = 'arrival' and f.bagCarousel is null;`
        const response = await connection.query(getArrivalFlightListBasedOnBaggageCarouselQuery);
        const parsedResponse = parseRowDataPacket(response);

        return{
          success: true,
          data: parsedResponse
        }
      }
      catch(e){
        console.log(e);
        return {
          success: false, 
          message: e.message
        }
      }
    }

}

export default new FlightService();



// getArrivalFlightListBasedOnTimeQuery = `select f.id as id, flight_number, status, source, destination, time_of_flight, a.name as airline 
// from flight as f join airline as a
// on f.airline_id = a.id
// where time_of_flight >= CONVERT_TZ(current_timestamp(), 'GMT', 'US/Pacific')
// and time_of_flight <= DATE_ADD(CONVERT_TZ(current_timestamp(), 'GMT', 'US/Pacific'),interval 1 hour)
// and status = '${status}'
  //`


  // select f.id as id, flight_number, status, source, destination, time_of_flight, a.name as airline 
  //       from flight as f join airline as a
  //       on f.airline_id = a.id
  //       where time_of_flight >= CONVERT_TZ(current_timestamp(), 'GMT', 'US/Pacific')
  //       and time_of_flight <= DATE_ADD(CONVERT_TZ(current_timestamp(), 'GMT', 'US/Pacific'),interval 2 hour)
  //       and time_of_flight >= DATE_ADD(CONVERT_TZ(current_timestamp(), 'GMT', 'US/Pacific'),interval 1 hour)
  //       and status = '${status}