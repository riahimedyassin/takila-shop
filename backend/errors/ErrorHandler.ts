import { NextFunction, Request, Response } from "express";
import { BaseHttpResponse } from "../helpers/BaseHttpResponse";
import { BaseHttpError } from "./BaseHttpError";

export class ErrorHandler {
  handler(err: Error, req: Request, res: Response, next: NextFunction) {
  
        if (err) {
          if (err instanceof BaseHttpError) {
            return res.status(err.status).json({
                message : err.message ,
                status : err.status
            });
          }
          return res.status(500).json({
            message : err.message
          });
        }
        next();
  }
}
