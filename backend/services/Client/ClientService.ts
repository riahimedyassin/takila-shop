import { ClientRegisterDTO } from "../../dto/Client/ClientRegisterDTO";
import { ClientUpdateDTO } from "../../dto/Client/ClientUpdateDTO";
import { Client } from "../../enteties/Client.entity";

/**
 * @interface
 * @description Client Service Interface
 */
export interface ClientService {
  /**
   * @public
   * @async
   * @description Create a new client
   * @param {ClientRegisterDTO} client
   * @returns {Promise<Client>}
   */
  createClient(client: ClientRegisterDTO): Promise<Client>;
  /**
   * @public
   * @async
   * @description Get All Clients
   * @returns {Promise<Client[]>}
   */
  findAll(): Promise<Client[]>;
  /**
   * @public
   * @async
   * @description Get All Clients By Region Filter
   * @param region
   */
  findByRegion(region: string): Promise<Client[]>;
  /**
   * @public
   * @async
   * @description Get Client By his ID
   * @param {number} id Client ID
   * @returns {Promise<Client | null>}
   */
  findByID(id: number): Promise<Client | null>;
  /**
   * @public
   * @async
   * @param {number} id
   * @param {Partial<ClientUpdateDTO>} body
   * @returns {Promise<boolean>}
   */
  update(id: number, body: Partial<ClientUpdateDTO>): Promise<boolean>;
  /**
   * @public
   * @async
   * @param {number} id
   * @returns {Promise<boolean>}
   */
  delete(id: number): Promise<boolean>;
}
