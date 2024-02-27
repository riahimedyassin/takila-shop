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
import bcrypt from 'bcrypt'

/**
 * @class
 * @description Admin service implementation
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
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService
  ) {}
  /**
   * @async
   * @param {AdminRegisterDTO} body 
   * @returns {Admin}
   */
  public async create(body: AdminRegisterDTO): Promise<Admin> {
    const queryRunner = this._dbService.manager.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const address = await this._addressService.init(body.address);
      body.address = address;
      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash(body.password,salt) ;
      body.password=password; 
      const admin = await this._adminRepository.save(body);
      await queryRunner.commitTransaction()
      return admin;
    } catch (error) {
        throw new BaseHttpError("Failed to create admin",StatusCodes.INTERNAL_SERVER_ERROR)
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
  ): Promise<boolean> {}
}
