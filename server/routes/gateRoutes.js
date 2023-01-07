import express from "express";
import GateController from "../controllers/gateController.js";
const router = express.Router();

/// server/flight/new
router.post('/new', GateController.addGate);
router.get('/list', GateController.getGate);
router.get('/list/terminal', GateController.getGateBasedOnTerminal);
//router.get('/list/airport', TerminalController.getTerminalBasedOnAirport);

export default router;
