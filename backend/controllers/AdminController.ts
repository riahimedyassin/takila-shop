import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
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
import { log } from "console";

@controller("/api/takila/v1/admins")
export class AdminController extends BaseHttpController {
  constructor(
    @inject(TYPES.AdminService) private readonly _adminService: AdminService
  ) {
    super();
  }
  @httpPost("/")
  public async create(@requestBody() body: any) {
    try {
      await validateOrReject(AdminRegisterDTO.toAdminRegisterDTO(body));
      const admin = await this._adminService.create(body);
      return new BaseHttpDataResponse(
        "Admin created successfully",
        StatusCodes.CREATED,
        admin
      );
    } catch (error) {
        throw error 
    }
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
    return admin;
  }
  @httpPost("/login")
  public async login(@requestBody() body: AdminLoginDTO) {
    bodyValidation(await validate(body));
    const token = await this._adminService.login(body);
    return new BaseHttpTokenResponse(token);
  }
}
