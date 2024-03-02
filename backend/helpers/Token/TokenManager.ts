import { JwtPayload } from "jsonwebtoken";

/**
 * @interface
 * @description Token Manager Interface
 */
export interface TokenManager {
  /**
   * @public
   * @description Retrun a signed JWT token given the user id
   * @param {number} id
   * @returns {string}
   */
  generate(id: number): string;
  /**
   * @public
   * @description Return the decoded ID of the user
   * @param {string} token Incoming token from the Authorization Header
   * @returns {JwtPayload | string}
   * @throws {JsonWebTokenError}
   */
  getPayload(token: string): string;
}
