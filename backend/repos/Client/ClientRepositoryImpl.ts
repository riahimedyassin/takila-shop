import { inject, injectable } from "inversify";
import { Client } from "../../enteties/Client.entity";
import { BaseRepository } from "../BaseRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/DB/DatabaseService";
import { ClientRepository } from "./ClientRepository";

/**
 * @class 
 * @classdesc Client Repository Implementation
 * @extends {BaseRepository<Client>} 
 * @implements {ClientRepository}
 */
@injectable()
export class ClientRepositoryImpl extends BaseRepository<Client> implements ClientRepository  {
    constructor(
        @inject(TYPES.DatabaseService) dbService : DatabaseService
    ) {
        super(Client)
    }
    public async findByRegion(region : string) : Promise<Client[]> {
        return await this.findBy({region })
    }
}