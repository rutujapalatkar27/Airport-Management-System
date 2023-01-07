import express from "express";
import FlightController from "../controllers/flightController.js";
const router = express.Router();

/// server/flight/new
router.post('/new', FlightController.addFlight);
router.get('/list/all', FlightController.getFlight);
router.get('/list/airline', FlightController.getFlightBasedOnAirline);
router.get('/list', FlightController.getFlightListBasedOnTimeAndStatus);
router.get('/:id', FlightController.geFlightDetailsBasedOnId);
router.get('/list/arrival/nobag', FlightController.getArrivalFlightListBasedOnBaggageCarousel);
export default router;

