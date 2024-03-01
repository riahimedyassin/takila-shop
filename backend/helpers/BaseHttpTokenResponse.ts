import { StatusCodes } from "http-status-codes";
import { BaseHttpResponse } from "./BaseHttpResponse";

/**
 * @class
 * @classdesc Base Http response holding tokens with it
 * @extends {BaseHttpResponse}
 */
export class BaseHttpTokenResponse extends BaseHttpResponse {
  token: string;
   /**
   * @constructor
   * @param {string} message 
   * @param {StatusCodes} status 
   * @param {string} token 
   */
  constructor(message: string, status: StatusCodes, token: string) {
    super(message, status);
    this.token = token;
  }
}
