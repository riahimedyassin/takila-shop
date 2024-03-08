import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPatch,
  httpPost,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { TYPES } from "../constants/TYPES";
import { AdminService } from "../services/Admin/AdminService";
import { AdminRegisterDTO } from "../dto/Admin/AdminRegisterDTO";
import { bodyValidation } from "../helpers/BodyValidation";
import { validate, validateOrReject } from "class-validator";
import { BaseHttpDataResponse } from "../helpers/BaseHttpMessageResponse";
import { StatusCodes } from "http-status-codes";
import { AdminLoginDTO } from "../dto/Admin/AdminLoginDTO";
import { BaseHttpTokenResponse } from "../helpers/BaseHttpTokenResponse";
import { AdminUpdateDTO } from "../dto/Admin/AdminUpdateDTO";
import { BaseHttpError } from "../errors/BaseHttpError";
import { BaseHttpResponse } from "../helpers/BaseHttpResponse";

@controller("/api/takila/v1/admins")
export class AdminController extends BaseHttpController {
  constructor(
    @inject(TYPES.AdminService) private readonly _adminService: AdminService
  ) {
    super();
  }
  @httpPost("/")
  public async create(@requestBody() body: any) {
    await validateOrReject(AdminRegisterDTO.fromAny(body));
    const admin = await this._adminService.createAdmin(body);
    return new BaseHttpDataResponse(
      "Admin created successfully",
      StatusCodes.CREATED,
      admin
    );
  }
  @httpGet("/")
  public async findAll() {
    const admins = await this._adminService.findAll();
    return new BaseHttpDataResponse(
      "Admin list retrieved sucessfully",
      StatusCodes.OK,
      admins
    );
  }
  @httpGet("/:id")
  public async findOne(@requestParam("id") id: number) {
    const admin = await this._adminService.findOneByID(id);
    return new BaseHttpDataResponse(
      "Admin retrieved successfully",
      StatusCodes.OK,
      admin
    );
  }
  @httpPost("/login")
  public async login(@requestBody() body: AdminLoginDTO) {
    bodyValidation(await validate(body));
    const token = await this._adminService.login(body);
    return new BaseHttpTokenResponse(token);
  }
  @httpPatch("/:id")
  public async update(
    @requestParam("id") id: number,
    @requestBody() body: Partial<AdminUpdateDTO>
  ) {
    const changes = AdminUpdateDTO.fromAny(body);
    await validateOrReject(changes, { skipMissingProperties: true });
    const updated = await this._adminService.update(id, body);
    if(!updated) return new BaseHttpError("Could not updaed admin",StatusCodes.INTERNAL_SERVER_ERROR)
    return new BaseHttpResponse("Admin Updated Successfully",StatusCodes.OK)
  }

}
