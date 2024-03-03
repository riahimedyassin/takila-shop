import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { BaseMiddleware } from "inversify-express-utils";
import { ParsedQs } from "qs";
import { BaseHttpError } from "../errors/BaseHttpError";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { inject, injectable } from "inversify";
import { TYPES } from "../constants/TYPES";
import { AdminService } from "../services/Admin/AdminService";
import { log } from "console";

@injectable()
export class AdminAuthMiddleware extends BaseMiddleware {
  constructor(
    @inject(TYPES.AdminService) private readonly _adminService : AdminService
  ) {
    super()
  }
  private readonly _forrbiddenError = new BaseHttpError(ReasonPhrases.FORBIDDEN,StatusCodes.FORBIDDEN)
  handler(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): void {
    try {
      const id = res.get('id'); 
      if(!id) throw this._forrbiddenError ; 
      const admin = this._adminService.findOneByID(+id); 
      if(!admin) throw this._forrbiddenError ; 
      next()
    } catch (error) {
        throw this._forrbiddenError ; 
    }
  }
}
