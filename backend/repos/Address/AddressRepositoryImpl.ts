import { injectable } from "inversify";
import { Address } from "../../enteties/Address.entity";
import { BaseRepository } from "../BaseRepository";
import { AddressRepository } from "./AddressRepositroy";


/**
 * @class 
 * @description Address Repository manager
 * @implements {AddressRepository}
 * @extends {BaseRepository<Address>}
 */
@injectable()
export class AddressRepositoryImpl extends BaseRepository<Address> implements AddressRepository {
    constructor() {
        super(Address)
    }
}