import { StatusCodes } from "http-status-codes";
import { BaseHttpResponse } from "./BaseHttpResponse";

/**
 * @class
 * @classdesc Base Http response holding tokens with it
 * @extends {BaseHttpResponse}
 */
export class BaseHttpTokenResponse extends BaseHttpResponse {
  public readonly token: string;
   /**
   * @constructor
   * @param {string} token 
   */
  constructor(token: string) {
    super("Token Generated Successfully", StatusCodes.OK);
    this.token = token;
  }
}
