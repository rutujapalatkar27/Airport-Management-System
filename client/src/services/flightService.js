import dayjs from "dayjs";
import { BACKEND_PORT, BACKEND_URL } from "./constants"

export const fetchFlightListService = async ({interval, status: flightStatus}) => {
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
      const response = await fetch(
        `${BACKEND_URL}:${BACKEND_PORT}/flight/list?interval=${interval}&status=${flightStatus}`, options);
      const status = response.status;
      const data = await response.json();
      return { status, data };
}

export const fetchFlightListForAirlineService = async (airlineId) => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/flight/list/airline?airlineId=${airlineId}`, options);
  const status = response.status;
  const data = await response.json();
  return { status, data };
}


export const addFlightService = async (flight) => {

  // Setting correct time format
  // It is not a grood practice to do this in service, but don't really have much of an option
  flight.time_of_flight = dayjs(flight.time_of_flight).format('YYYY-MM-DD HH:mm');
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(flight)
  }
  const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/flight/new`, options);
  const status = response.status;
  const data = await response.json();
  return {status, data};
}

export const fetchFlightDetailsService = async(flightId) => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'},
  }
  const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/flight/${flightId}`, options);
  const status = response.status;
  const data = await response.json();
  return {status, data};
}

export const fetchArrivalFlightListBasedOnBagCarouselService = async () => {
  const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/flight/list/arrival/nobag`, options);
    const status = response.status;
    const data = await response.json();
    return { status, data };
}
