import { inject, injectable } from "inversify";
import { ClientRegisterDTO } from "../../dto/Client/ClientRegisterDTO";
import { ClientService } from "./ClientService";
import { TYPES } from "../../constants/TYPES";
import { ClientRepository } from "../../repos/Client/ClientRepository";
import { Client } from "../../enteties/Client.entity";

@injectable()
export class ClientServiceImpl implements ClientService {
    constructor(
        @inject(TYPES.ClientRepository) private readonly _clientRepository : ClientRepository
    ) {

    }
    public async create(client : ClientRegisterDTO) : Promise<Client> {
        return await this._clientRepository.createRecord(client)
    }
    
}