//SJSU CMPE 138 Spring 2022 TEAM3 

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import util from 'util';
import cron from 'node-cron';
// const { createLogger, format, transports } = require('winston');


import testRouter from './routes/testRoutes.js';
import flightRouter from './routes/flightRoutes.js';
import terminalRouter from './routes/terminalRoutes.js';
import gateRouter from './routes/gateRoutes.js'
import bagCarouselRouter from './routes/bagCarouselRoutes.js';
import userRouter from './routes/userRoutes.js';
import { parseRowDataPacket } from './services/parsingService.js';

const port = 5001;
const corsConfig = {
  credentials: true,
  origin: true,
};


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

export const connection = mysql.createConnection({
  host: 'mavericksdatabase.cqpn9b5pnb1l.us-west-1.rds.amazonaws.com',
  port: 3306,
  user: 'admin',
  password: 'admin1234',
  database: "mavericksdatabase"
});




connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

connection.query = util.promisify(connection.query).bind(connection);



//Primary Routes
app.use('/test', testRouter);
app.use('/flight', flightRouter);
app.use('/terminal', terminalRouter);
app.use('/gate', gateRouter);
app.use('/baggage', bagCarouselRouter);
app.use('/user', userRouter);



//Cron Jobs

cron.schedule("*/10 * * * * *", function() {
  console.log("running a task every 10 second");
  FreeGate();
  assignGate();
});


const assignGate = async () => {
  const GateavailableQuery = `SELECT id, status FROM gate where status="available"`;
  try {
    const response = await connection.query(GateavailableQuery);
    const parsedResponsegate = parseRowDataPacket(response);
    //console.log(parsedResponsegate);

    const GateinuseQuery = `SELECT id, time_of_flight from flight
      where time_of_flight >= CONVERT_TZ(current_timestamp(), 'GMT', 'US/Pacific')
      and time_of_flight <= DATE_ADD(CONVERT_TZ(current_timestamp(), 'GMT', 'US/Pacific'),interval 1 hour)
      and id not in ( select assigned from gate where assigned is not null);`;

      const response2 = await connection.query(GateinuseQuery);
      const parsedResponseflight = parseRowDataPacket(response2);
      //console.log(parsedResponseflight);
      const map1 = {};
      // console.log(parsedResponsegate.pop()["id"])
      // console.log(parsedResponseflight.pop()["id"])
    while(parsedResponseflight.length > 0){
      //console.log("ki")
      map1[parsedResponsegate.pop()["id"]] = parsedResponseflight.pop()["id"];
    }
    //console.log(map1);
  // for(let key in map1){
  //   console.log(key,map1[key]);
  // }
    
    if (Object.keys(map1).length >=1){
      let Gateupdatequery = `Update gate set status="inuse" , assigned = case`
      let keyarray = '('
      for(let key in map1){
          const x = ' when id = "' + key.toString() + '" then "' + map1[key].toString() +'"'
          //console.log("x",x)
          Gateupdatequery += x
          keyarray+=key.toString()
          keyarray+=','
      }
      keyarray=keyarray.substring(0,keyarray.length-1)
      keyarray+=')'
      console.log("keyarray",keyarray)
      Gateupdatequery += ' end where id in '
      Gateupdatequery += keyarray
      const response3 = await connection.query(Gateupdatequery);
      const parsedResponseupdate = parseRowDataPacket(response3);
      //console.log(Gateupdatequery);
  }
  }

  catch (e) {
    console.log(e);
    return {
      success: false,
      message: e.message
    }
  }
}

const FreeGate = async () => {
  const GateinuseQuery = `SELECT g.id FROM mavericksdatabase.gate g 
  join mavericksdatabase.flight f on g.assigned=f.id 
  where g.status = "inuse" and 
  (
  (f.status="departure" and f.time_of_flight < CONVERT_TZ(current_timestamp(), 'GMT', 'US/Pacific')) or
  (f.status="departure" and f.time_of_flight > DATE_ADD(CONVERT_TZ(current_timestamp(), 'GMT', 'US/Pacific'),interval 1 hour)) or
  (f.status="arrival" and f.time_of_flight < DATE_ADD(CONVERT_TZ(current_timestamp(), 'GMT', 'US/Pacific'),interval -1 hour)) or
  (f.status="arrival" and f.time_of_flight > DATE_ADD(CONVERT_TZ(current_timestamp(), 'GMT', 'US/Pacific'),interval 1 hour))
  )`;
  try {
    const response = await connection.query(GateinuseQuery);
    const parsedResponsegateinuse = parseRowDataPacket(response);
    //console.log(parsedResponsegateinuse);

    // pass a function to map
    const map1 = parsedResponsegateinuse.map(x => x.id);
    //console.log(map1)
    if(map1.length>0){
      const freegateids =`update gate set assigned=null, status="available" where id in (${map1})`;
      const response1 = await connection.query(freegateids);
      const parsedResponsegateinuse1 = parseRowDataPacket(response1);
    }
  


  }
    catch (e) {
      console.log(e);
      return {
        success: false,
        message: e.message
      }
    }
  }

 


