import { inject, injectable } from "inversify";
import { ClientRegisterDTO } from "../../dto/Client/ClientRegisterDTO";
import { ClientService } from "./ClientService";
import { TYPES } from "../../constants/TYPES";
import { ClientRepository } from "../../repos/Client/ClientRepository";
import { Client } from "../../enteties/Client.entity";
import { UserCreationService } from "../User/UserCreationService";
import { log } from "console";

/**
 * @class
 * @classdesc Client Service Implementation
 * @extends {UserCreationService}
 * @implements {ClientService}
 */
@injectable()
export class ClientServiceImpl extends UserCreationService implements ClientService {
    constructor(
        @inject(TYPES.ClientRepository) private readonly _clientRepository : ClientRepository
    ) {
        super()
    }
    public async createClient(client : ClientRegisterDTO) : Promise<Client> {
        return await super.create<Client>(this._clientRepository,client)
    }
    public async findAll(): Promise<Client[]> {
        log("Found")
        return await this._clientRepository.findAll()
    }
    public async findByRegion(region: string): Promise<Client[]> {
        return await this._clientRepository.findByRegion(region)    
    }
    public async getClient(id : number) : Promise<Client|null> {
        return await this._clientRepository.findByID(id)
    }
    public async findByID(id: number): Promise<Client | null> {
        return await this._clientRepository.findByID(id)
    }
    
}