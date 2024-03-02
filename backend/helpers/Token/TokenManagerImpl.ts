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
  private readonly _secretKey = <string>process.env.SECRET_TOKEN;
  public generate(id: number): string {
    const token = jwt.sign({id : id.toString()}, this._secretKey, { expiresIn: "3h" });
    return token;
  }
  public getPayload(token: string): string {
    const {id} = <{id: string}>jwt.verify(token, this._secretKey);
    return id;
  }
}
