import { AddressDTO } from "../../dto/Address/AddressDTO";
import { Address } from "../../enteties/Address.entity";
/**
 * @interface
 * @description Address Service Interface
 */
export interface AddressService {
    init(body : AddressDTO) : Promise<Address>
    update(id:number , body : Partial<AddressDTO>) : Promise<boolean>
}