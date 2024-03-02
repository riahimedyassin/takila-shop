import { injectable } from "inversify";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TokenManager } from "./TokenManager";

/**
 * @class
 * @classdesc JWT Token Manager
 * @requires jsonwebtoken
 */
@injectable()
export class TokenManagerImpl implements TokenManager {
  private readonly _secretKey = <string>process.env.SECRET_KEY;
  public generate(id: number): string {
    const token = jwt.sign(id.toString(), "", { expiresIn: "3min" });
    return token;
  }
  public getPayload(token: string): string {
    const verfied = <string>jwt.verify(token, this._secretKey);
    return verfied;
  }
}
