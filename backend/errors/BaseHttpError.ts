import { StatusCodes } from "http-status-codes";

export class BaseHttpError extends Error {
  constructor(message: string, public status: StatusCodes) {
    super(message);
  }
}
