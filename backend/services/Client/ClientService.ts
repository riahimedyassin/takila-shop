import { ClientRegisterDTO } from "../../dto/Client/ClientRegisterDTO";
import { Client } from "../../enteties/Client.entity";

/**
 * @interface
 * @description Client Service Interface
 */
export interface ClientService  {
    /**
     * @public
     * @async 
     * @description Create a new client 
     * @param {ClientRegisterDTO} client 
     * @returns {Promise<Client>} 
     */
    createClient(client : ClientRegisterDTO) : Promise<Client>
    findAll() : Promise<Client[]>
    findByRegion(region : string) : Promise<Client[]>
}