import { NextFunction, Request, Response } from "express";
import { BaseHttpResponse } from "../helpers/BaseHttpResponse";
import { BaseHttpError } from "./BaseHttpError";
import { ValidationError } from "class-validator";
import { StatusCodes } from "http-status-codes";
import { ValidationErrorResponse } from "../types/ValidationErrorResponse";



/**
 * @class 
 * @classdesc Error Handling class
 * @todo Change the Validation error logic handling
 */
export class ErrorHandler {
  /**
   * @constructor
   * @description Binding the this keyword to the method handler so we can reference this in the bootstrap
   */
  constructor() {
    this.handler=this.handler.bind(this)
  }
  /**
   * @public
   * @param {any} err Incoming Request Errors 
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   */
  public handler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err) {
      if (err instanceof BaseHttpError) {
        return res.status(err.status).json({
          message: err.message,
          status: err.status,
        });
      } else if (err[0] instanceof ValidationError) {
        const errors = this.extractValidationError(err)
        return res.status(StatusCodes.BAD_REQUEST).json({
          message : "Data validation failed",
          errors,
          status: StatusCodes.BAD_REQUEST,
        });
      }
    }
    next();
  }
  /**
   * @private
   * @description Extract a simplified readable error from the ValidationErrors
   * @param {ValidationError[]} errors 
   * @returns {ValidationErrorResponse[]}
   * @see {@link ValidationErrorResponse} The return type of the function
   */
  private extractValidationError(errors : ValidationError[]) : ValidationErrorResponse[] {
    const final : ValidationErrorResponse[]= []
    errors.forEach((error) => {
      final.push({property : error.property , constraints : error.constraints})
    })
    return final 
  }
  
}
