import BagCarouselService from "../services/bagCarouselService.js";
import {sendCustomError, sendCustomSuccess, sendInternalServerError} from './common.js';

class BagCarouselController {
    addBagCarousel = async (req, res) => {
        const serviceResponse = await BagCarouselService.addBagCarousel(req.body);
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
    getBagCarousel = async (req, res) => {
        const serviceResponse = await BagCarouselService.getBagCarouselList(req.body);
        if(serviceResponse.success ===  true){
            sendCustomSuccess(res, serviceResponse.data);
        }
        else{
            sendInternalServerError(res);
        }
    }

    getAvailableBagCarousel = async (req, res) => {
        const serviceResponse = await BagCarouselService.getAvailableBagCarouselList(req.body);
        if(serviceResponse.success ===  true){
            sendCustomSuccess(res, serviceResponse.data);
        }
        else{
            sendInternalServerError(res);
        }
    }

    getAssignedBagCarousel = async (req, res) => {
        const serviceResponse = await BagCarouselService.getAssignedBagCarouselList(req.body);
        if(serviceResponse.success ===  true){
            sendCustomSuccess(res, serviceResponse.data);
        }
        else{
            sendInternalServerError(res);
        }
    }

}

export default new BagCarouselController();