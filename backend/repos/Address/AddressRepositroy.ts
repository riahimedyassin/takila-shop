import { Address } from "../../enteties/Address.entity";
import { IRepository } from "../../types/IRepository";

/**
 * @interface
 * @description Address Repository interface 
 * @extends {IRepository<Address>}
 */
export interface AddressRepository extends IRepository<Address> {

}