import { inject } from "inversify";
import { controller, httpGet, requestParam } from "inversify-express-utils";
import { TYPES } from "../constants/TYPES";
import { CompanyService } from "../services/Company/CompanyService";
import { BaseHttpError } from "../errors/BaseHttpError";
import { StatusCodes } from "http-status-codes";
import { BaseHttpDataResponse } from "../helpers/BaseHttpMessageResponse";

@controller("/api/takila/v1/companies")
export class CompanyController {
  constructor(
    @inject(TYPES.CompanyService)
    private readonly _companyService: CompanyService
  ) {}
  @httpGet("/")
  public async getAll() {
    const companies = await this._companyService.findAll();
    if (!companies)
      return new BaseHttpError(
        "Cannot get companies",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    return new BaseHttpDataResponse(
      "Companies Retrived successfully",
      StatusCodes.OK,
      companies
    );
  }
  @httpGet("/:id")
  public async getByID(@requestParam("id") id: number) {
    const company = await this._companyService.findByID(id);
    if (!company)
      return new BaseHttpError("Company not found", StatusCodes.NOT_FOUND);
    return new BaseHttpDataResponse(
      "Company retrieved successfully",
      StatusCodes.OK,
      company
    );
  }
}
