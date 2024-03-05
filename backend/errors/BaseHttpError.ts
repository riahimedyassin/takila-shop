import { StatusCodes } from "http-status-codes";


/**
 * @class 
 * @extends {Error}
 * @classdesc Http base error 
 */
export class BaseHttpError extends Error {
  constructor(message: string, public status: StatusCodes) {
    super(message);
  }
}
