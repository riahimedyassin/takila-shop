import { Client } from "../../enteties/Client.entity";
import { IRepository } from "../../types/IRepository";

/**
 * @interface
 * @description Client Repository Interface
 * @extends {IRepository<Client>}
 */
export interface ClientRepository extends IRepository<Client> {
    /**
     * @public 
     * @async 
     * @description Filter Client By Region
     * @param {string} region Region of the clients
     * @returns {Promise<Client[]>}
     */
    findByRegion(region : string) : Promise<Client[]>
}