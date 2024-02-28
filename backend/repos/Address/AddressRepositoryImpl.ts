import { inject, injectable } from "inversify";
import { Address } from "../../enteties/Address.entity";
import { BaseRepository } from "../BaseRepository";
import { AddressRepository } from "./AddressRepositroy";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/DB/DatabaseService";


/**
 * @class 
 * @description Address Repository manager
 * @implements {AddressRepository}
 * @extends {BaseRepository<Address>}
 */
@injectable()
export class AddressRepositoryImpl extends BaseRepository<Address> implements AddressRepository {
    constructor(@inject(TYPES.DatabaseService) _dbService : DatabaseService) {
        super(Address)
    }
}