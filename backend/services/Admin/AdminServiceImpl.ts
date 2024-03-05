import { inject, injectable } from "inversify";
import { AdminService } from "./AdminService";
import { TYPES } from "../../constants/TYPES";
import { AdminRepository } from "../../repos/Admin/AdminRepository";
import { Admin } from "../../enteties/Admin.entity";
import { AdminRegisterDTO } from "../../dto/Admin/AdminRegisterDTO";
import { AdminUpdateDTO } from "../../dto/Admin/AdminUpdateDTO";
import { EPermission } from "../../types/EPermission";
import { BaseHttpError } from "../../errors/BaseHttpError";
import { StatusCodes } from "http-status-codes";
import { AdminGlobalResponse } from "../../dto/Admin/AdminGlobalResponse";
import { AdminLoginDTO } from "../../dto/Admin/AdminLoginDTO";
import { TokenManager } from "../../helpers/Token/TokenManager";
import { UserCreationService } from "../User/UserCreationService";

/**
 * @class
 * @classdesc Admin service implementation
 * @extends {UserCreationService}
 * @implements {AdminService}
 */
@injectable()
export class AdminServiceImpl extends UserCreationService implements AdminService {
  constructor(
    @inject(TYPES.AdminRepository)
    private readonly _adminRepository: AdminRepository,
    @inject(TYPES.TokenManager) private readonly _tokenManager: TokenManager
  ) {
    super()
  }
  public async createAdmin(body: AdminRegisterDTO): Promise<Admin> {
      return super.create<Admin>(this._adminRepository,body)
  }
  public async delete(id: number): Promise<boolean> {
    return await this._adminRepository.findOneAndDelete(id);
  }
  public async update(
    id: number,
    body: Partial<AdminUpdateDTO>
  ): Promise<boolean> {
    return await this._adminRepository.findOneAndUpdate(id, body);
  }
  public async updatePermission(
    id: number,
    permission: EPermission
  ): Promise<boolean> {
    return await this._adminRepository.findOneAndUpdate(id, {
      isSup: permission == EPermission.sup,
    });
  }
  public async findAll(): Promise<AdminGlobalResponse[]> {
    const admins = await this._adminRepository.findAll();
    return admins.map(
      (admin) =>
        new AdminGlobalResponse(
          admin.name,
          admin.lastname,
          admin.email,
          admin.address
        )
    );
  }
  public async findOneByID(id: number): Promise<Admin | null> {
    const admin = await this._adminRepository.findByID(id);
    return admin;
  }
  public async login(body: AdminLoginDTO): Promise<string> {
    const admin = await this._adminRepository.findOneByEmail(body.email);
    if (!admin)
      throw new BaseHttpError(
        "Invalid Email or Password",
        StatusCodes.BAD_REQUEST
      );
    if (!(await this._hashingManager.isMatching(body.password, admin.password)))
      throw new BaseHttpError(
        "Invalid Email or Password",
        StatusCodes.BAD_REQUEST
      );

    return this._tokenManager.generate(admin.id);
  }
}
