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
import { TokenManager } from "../helpers/Token/TokenManager";

@injectable()
export class AdminAuthMiddleware extends BaseMiddleware {
  constructor(
    @inject(TYPES.AdminService) private readonly _adminService: AdminService,
    @inject(TYPES.TokenManager) private readonly _tokenManager: TokenManager
  ) {
    super();
  }
  private readonly _forrbiddenError = new BaseHttpError(
    ReasonPhrases.FORBIDDEN,
    StatusCodes.FORBIDDEN
  );
  private readonly _unAuthError = new BaseHttpError(
    ReasonPhrases.UNAUTHORIZED,
    StatusCodes.UNAUTHORIZED
  );
  handler(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): void {
    const auth: string | undefined = req.get("Authorization");
    if (!auth) throw this._unAuthError;
    if (!auth.includes("Bearer") || !(auth.indexOf("Bearer") == 0))
      throw this._unAuthError;
    const rowToken = auth.split(" ")[1];
    const id = this._tokenManager.getPayload(rowToken);
    const admin = this._adminService.findOneByID(+id);
    if (!admin) throw this._forrbiddenError;
    res.set("id", id);
    next();
  }
}
