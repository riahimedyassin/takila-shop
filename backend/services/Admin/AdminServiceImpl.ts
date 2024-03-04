import { inject, injectable } from "inversify";
import { AdminService } from "./AdminService";
import { TYPES } from "../../constants/TYPES";
import { AdminRepository } from "../../repos/Admin/AdminRepository";
import { Admin } from "../../enteties/Admin.entity";
import { AdminRegisterDTO } from "../../dto/Admin/AdminRegisterDTO";
import { AddressService } from "../Address/AddressService";
import { AdminUpdateDTO } from "../../dto/Admin/AdminUpdateDTO";
import { EPermission } from "../../types/EPermission";
import { DatabaseService } from "../DB/DatabaseService";
import { BaseHttpError } from "../../errors/BaseHttpError";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { AdminGlobalResponse } from "../../dto/Admin/AdminGlobalResponse";
import { log } from "console";
import { AdminLoginDTO } from "../../dto/Admin/AdminLoginDTO";
import { HashingManager } from "../../helpers/Hashing/HashingManager";
import { TokenManager } from "../../helpers/Token/TokenManager";

/**
 * @class
 * @classdesc Admin service implementation
 * @implements {AdminService}
 * @requires bcrypt
 * @todo Verfiy the creation logic
 * @todo Add a cascade constraint (Address Admin)
 */
@injectable()
export class AdminServiceImpl implements AdminService {
  constructor(
    @inject(TYPES.AdminRepository)
    private readonly _adminRepository: AdminRepository,
    @inject(TYPES.AddressService)
    private readonly _addressService: AddressService,
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService,
    @inject(TYPES.HashingManager)
    private readonly _hashingManager: HashingManager,
    @inject(TYPES.TokenManager) private readonly _tokenManager: TokenManager
  ) {}
  public async create(body: AdminRegisterDTO): Promise<Admin> {
    const queryRunner = this._dbService.manager.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction("SERIALIZABLE");
      const address = await this._addressService.create(body.address);
      body.address = address;
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(body.password, salt);
      body.password = password;
      const admin = await this._adminRepository.createRecord(body);
      await queryRunner.commitTransaction();
      return admin;
    } catch (error) {
      log(error);
      queryRunner.rollbackTransaction();
      throw new BaseHttpError(
        "Failed to create admin",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
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
