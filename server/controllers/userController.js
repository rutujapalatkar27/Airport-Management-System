import UserService from "../services/userService.js";
import { sendCustomSuccess, sendInternalServerError } from "./common.js";


class UserController {
    signUp = async (req, res) => {
        const serviceResponse = await UserService.signUp(req.body);
        if(serviceResponse.success === true){
          sendCustomSuccess(res, serviceResponse.data);
        }
        else{
          sendInternalServerError(res);
        }
    }
    signIn = async (req, res) => {
        const serviceResponse = await UserService.signIn(req.body);
        if(serviceResponse.success === true){
          sendCustomSuccess(res, serviceResponse.data);
        }
        else{
          sendInternalServerError(res);
        }
    }
}

export default new UserController();
