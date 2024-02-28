import { StatusCodes } from "http-status-codes";


/**
 * @class 
 * @extends {Error}
 * @description Http base error 
 */
export class BaseHttpError extends Error {
  constructor(message: string, public status: StatusCodes) {
    super(message);
  }
}
