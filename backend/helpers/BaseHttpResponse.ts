import { StatusCodes } from "http-status-codes";

/**
 * @class
 * @classdesc Base Http Response Class
 */
export class BaseHttpResponse {
  message: string;
  status: StatusCodes;
/**
 * @constructor
 * @param {string} message 
 * @param {StatusCodes} status 
 */
  constructor(
    message: string,
    status: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    this.message = message;
    this.status = status;
  }
}
