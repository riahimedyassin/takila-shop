import { inject, injectable } from "inversify";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../DB/DatabaseService";
import { AddressService } from "../Address/AddressService";
import { AddressDTO } from "../../dto/Address/AddressDTO";
import bcrypt from "bcrypt";
import { log } from "console";
import { BaseHttpError } from "../../errors/BaseHttpError";
import { StatusCodes } from "http-status-codes";
import { AdminRepository } from "../../repos/Admin/AdminRepository";
import { ClientRepository } from "../../repos/Client/ClientRepository";
import { Client } from "../../enteties/Client.entity";
import { Admin } from "../../enteties/Admin.entity";
import { AdminRegisterDTO } from "../../dto/Admin/AdminRegisterDTO";
import { ClientRegisterDTO } from "../../dto/Client/ClientRegisterDTO";
import { HashingManager } from "../../helpers/Hashing/HashingManager";

/**
 * @class
 * @abstract
 * @classdesc User Creation Service
 * As {@link Admin} and {@link Client} creation is the same process, this class handles the use
 * case of creating a user in general.
 */
@injectable()
export abstract class UserCreationService {
  @inject(TYPES.DatabaseService)
  protected readonly _dbService!: DatabaseService;
  @inject(TYPES.AddressService)
  protected readonly _addressService!: AddressService;
  @inject(TYPES.HashingManager)
  protected readonly _hashingManager!: HashingManager;
  private readonly repos!: AdminRepository | ClientRepository;
  /**
   * @protected
   * @async
   * @description Handles the creation of T {@link Admin} or {@link Client}
   * @param {AdminRepository | ClientRepository} repository
   * @param {AdminRegisterDTO | ClientRegisterDTO} body
   * @template E The return type of the create function expected : Admin or Client
   * @returns {Promise<E>}
   */
  protected async create<E extends Admin | Client>(
    repository: AdminRepository | ClientRepository,
    body: AdminRegisterDTO | ClientRegisterDTO
  ): Promise<E> {
    const queryRunner = this._dbService.manager.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction("SERIALIZABLE");
      const address = await this._addressService.create(body.address);
      body.address = address;
      const password = await this._hashingManager.encode(body.password);
      body.password = password;
      const user = (await repository.createRecord(body)) as E;
      await queryRunner.commitTransaction();
      return user;
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw new BaseHttpError(
        `Failed to create entity`,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
