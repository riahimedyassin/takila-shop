import { inject, injectable } from "inversify";
import { Company } from "../../enteties/Company.entity";
import { BaseRepository } from "../BaseRepository";
import { CompanyRepository } from "./CompanyRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/DB/DatabaseService";

/**
 * @class
 * @extends {BaseRepository<Company>}
 * @implements {CompanyRepository}
 * @classdesc Company Repository Implementation
 */
@injectable()
export class CompanyRepositoryImpl extends BaseRepository<Company> implements CompanyRepository {
    constructor(
        @inject(TYPES.DatabaseService) dbService : DatabaseService 
    ) {
        super(Company); 
    }
    public async findByName(name : string ) : Promise<Company | null> {
        const company = await this.findOneBy({name:name}) ;
        return company ; 
    }
}