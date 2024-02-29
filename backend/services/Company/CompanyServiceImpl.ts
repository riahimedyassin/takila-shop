import { inject, injectable } from "inversify";
import { CompanyService } from "./CompanyService";
import { TYPES } from "../../constants/TYPES";
import { CompanyRepository } from "../../repos/Company/CompanyRepository";
import { Company } from "../../enteties/Company.entity";
import { CompanyRegisterDTO } from "../../dto/Company/CompanyRegisterDTO";
import { AddressService } from "../Address/AddressService";
import { DatabaseService } from "../DB/DatabaseService";


/**
 * @class
 * @implements {CompanyService}
 * @classdesc Company Service Implementation
 */
@injectable()
export class CompanyServiceImpl implements CompanyService {
    constructor(
        @inject(TYPES.CompanyRepository) private readonly _companyRepository : CompanyRepository,
        @inject(TYPES.AddressService) private readonly _addressService : AddressService,
        @inject(TYPES.DatabaseService) private readonly _dbService : DatabaseService
    ) {

    }
    public async create(body: CompanyRegisterDTO): Promise<Company> {
        const queryRunner = this._dbService.db.createQueryRunner();     
        await queryRunner.connect(); 
        await queryRunner.startTransaction(); 
        try {
            const address = await this._addressService.create(body.address); 
            body.address = address ; 
            const company = await this._companyRepository.createRecord(body); 
            await queryRunner.commitTransaction(); 
            return company ; 
        } catch (error) {
            queryRunner.rollbackTransaction();
            throw error ; 
        }
    }
    public async findByName(name: string): Promise<Company | null> {
        const company = await this._companyRepository.findByName(name); 
        return company ; 
    }
}