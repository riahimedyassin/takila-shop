import { inject, injectable } from "inversify";
import { AddressService } from "./AddressService";
import { TYPES } from "../../constants/TYPES";
import { AddressRepository } from "../../repos/Address/AddressRepositroy";
import { AddressDTO } from "../../dto/Address/AddressDTO";
import { Address } from "../../enteties/Address.entity";
import { log } from "console";

/**
 * @class
 * @description Address Service Implementation 
 * @todo Verify the existance of such an address
 */
@injectable()
export class AddressServiceImpl implements AddressService {
  constructor(
    @inject(TYPES.AddressRepository)
    private readonly _addressRepository: AddressRepository
  ) {}
  public async create(body: AddressDTO): Promise<Address> {
    log(body);
    const address = await this._addressRepository.createRecord(body);
    return address;
  }
  public async update(id: number, body: Partial<AddressDTO>): Promise<boolean> {
    return await this._addressRepository.findOneAndUpdate(id, body);
  }
}
