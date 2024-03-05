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
    create(client : ClientRegisterDTO) : Promise<Client>
}