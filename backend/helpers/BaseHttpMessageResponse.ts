import { StatusCodes } from "http-status-codes";
import { BaseHttpResponse } from "./BaseHttpResponse";
/**
 * @class
 * @classdesc Base Http response holding data with it
 * @extends {BaseHttpResponse}
 */
export class BaseHttpDataResponse extends BaseHttpResponse {
  data: any;
  /**
   * @constructor
   * @param {string} message 
   * @param {StatusCodes} status 
   * @param {any} data 
   */
  constructor(message: string, status: StatusCodes, data: any) {
    super(message, status);
    this.data = data;
  }
}
