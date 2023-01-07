import FlightService from "../services/flightService.js";
import {sendCustomSuccess, sendInternalServerError} from './common.js';

class FlightController {
    addFlight = async (req, res) => {
        const serviceResponse = await FlightService.addFlight(req.body);
        if(serviceResponse.success ===  true){
            sendCustomSuccess(res, serviceResponse.data);
        }
        else{
            sendInternalServerError(res);
        }
    }
    getFlight = async (req, res) => {
        const serviceResponse = await FlightService.getFlightList(req.body);
        if(serviceResponse.success ===  true){
            sendCustomSuccess(res, serviceResponse.data);
        }
        else{
            sendInternalServerError(res);
        }
    }
    getFlightBasedOnAirline = async(req, res) => {
        const serviceResponse = await FlightService.getFlightListBasedOnAirline(req.query);
        if(serviceResponse.success == true){
            sendCustomSuccess(res, serviceResponse.data);
        }
        else{
            sendInternalServerError(res);
        }
    }
    getFlightListBasedOnTimeAndStatus = async(req, res) => {
        const serviceResponse = await FlightService.getFlightListBasedOnTimeAndStatus(req.query);
        if(serviceResponse.success == true){
            sendCustomSuccess(res, serviceResponse.data);
        }
        else{
            sendInternalServerError(res);
        }
    }
    geFlightDetailsBasedOnId = async(req, res) => {
        const serviceResponse = await FlightService.geFlightDetailsById(req.params);
        if(serviceResponse.success == true){
            sendCustomSuccess(res, serviceResponse.data);
        }
        else{
            sendInternalServerError(res);
        }
    }

    getArrivalFlightListBasedOnBaggageCarousel = async(req, res) => {
        const serviceResponse = await FlightService.getArrivalFlightListBasedOnBaggageCarousel(req.body);
        if(serviceResponse.success == true){
            sendCustomSuccess(res, serviceResponse.data);
        }
        else{
            sendInternalServerError(res);
        }
    }
}

export default new FlightController();