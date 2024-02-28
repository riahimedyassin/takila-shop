import { AddressDTO } from "../../dto/Address/AddressDTO";
import { Address } from "../../enteties/Address.entity";
/**
 * @interface
 * @description Address Service Interface
 */
export interface AddressService {
    /**
     * @public 
     * @async 
     * @description create an address entity
     * @param {AddressDTO} body Base Address Update DTO
     * @returns {Promise<Address>}
     */
    create(body : AddressDTO) : Promise<Address>
    /**
     * @public 
     * @async 
     * @description Update a single address
     * @param {number} id Address id
     * @param {AddressDTO} body Base Address Update DTO 
     * @returns {Promise<boolean>}
     */
    update(id:number , body : Partial<AddressDTO>) : Promise<boolean>
}