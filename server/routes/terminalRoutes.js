import express from "express";
import TerminalController from "../controllers/terminalController.js";
const router = express.Router();

/// server/flight/new
router.post('/new', TerminalController.addTerminal);
router.get('/list', TerminalController.getTerminal);
router.get('/:id', TerminalController.getTerminalDetailsBasedOnId);
//router.get('/list/airport', TerminalController.getTerminalBasedOnAirport);

export default router;
