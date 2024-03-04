import { StatusCodes } from "http-status-codes";
import { BaseHttpError } from "./BaseHttpError";

export class DTOTransformError extends BaseHttpError {
    constructor(message : string , status : StatusCodes = StatusCodes.BAD_REQUEST){
        super(message,status)
    }
}