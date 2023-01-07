import TerminalService from "../services/terminalService.js";
import {sendCustomSuccess, sendInternalServerError, sendCustomError} from './common.js';

class TerminalController {
    addTerminal = async (req, res) => {
        const serviceResponse = await TerminalService.addTerminal(req.body);
        if(serviceResponse.success ===  true){
            sendCustomSuccess(res, serviceResponse.data);
        }
        else{
            if(serviceResponse.message)
            {
                sendCustomError(res,500,serviceResponse.message);
            }
            else{
            sendInternalServerError(res);
            }
        }
    }
    getTerminal = async (req, res) => {
        const serviceResponse = await TerminalService.getTerminalList(req.body);
        if(serviceResponse.success ===  true){
            sendCustomSuccess(res, serviceResponse.data);
        }
        else{
            sendInternalServerError(res);
        }
    }
    getTerminalBasedOnAirport = async(req, res) => {
        const serviceResponse = await TerminalService.getTerminaltListBasedOnAirport(req.query);
        if(serviceResponse.success == true){
            sendCustomSuccess(res, serviceResponse.data);
        }
        else{
            sendInternalServerError(res);
        }
    }

    getTerminalDetailsBasedOnId = async(req, res) => {
        const serviceResponse = await TerminalService.getTerminalDetailsById(req.params);
        if(serviceResponse.success == true){
            sendCustomSuccess(res, serviceResponse.data);
        }
        else{
            sendInternalServerError(res);
        }
    }
}

export default new TerminalController();