import { inject } from "inversify";
import {
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { TYPES } from "../constants/TYPES";
import { CompanyService } from "../services/Company/CompanyService";
import { BaseHttpError } from "../errors/BaseHttpError";
import { StatusCodes } from "http-status-codes";
import { BaseHttpDataResponse } from "../helpers/BaseHttpMessageResponse";
import { CompanyRegisterDTO } from "../dto/Company/CompanyRegisterDTO";
import { validateOrReject } from "class-validator";
import { BaseHttpResponse } from "../helpers/BaseHttpResponse";

@controller("/companies")
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
  @httpPost("/")
  public async create(@requestBody() body: any) {
    const company = CompanyRegisterDTO.fromAny(body);
    await validateOrReject(company);
    const saved = await this._companyService.create(company);
    return new BaseHttpDataResponse(
      "Company Added Successfully",
      StatusCodes.CREATED,
      saved
    );
  }
  @httpDelete("/:id")
  public async delete(@requestParam("id") id: number) {
    if (isNaN(id))
      return new BaseHttpError("Invalid ID", StatusCodes.BAD_REQUEST);
    if (await this._companyService.delete(id))
      return new BaseHttpResponse(
        "Deleted Successfully",
        StatusCodes.NO_CONTENT
      );
    return new BaseHttpError(
      "Cannot delete company",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  @httpPatch("/:id")
  public async update(
    @requestBody() body: any,
    @requestParam("id") id: number
  ) {
    if (isNaN(id))
      return new BaseHttpError("Invalid ID", StatusCodes.BAD_REQUEST);
    const changes = CompanyRegisterDTO.fromAny(body);
    await validateOrReject(changes, { skipMissingProperties: true });
    if (await this._companyService.update(id, body))
      return new BaseHttpResponse(
        "Updated Successfully",
        StatusCodes.NO_CONTENT
      );
    return new BaseHttpError(
      "Cannot update this company",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
