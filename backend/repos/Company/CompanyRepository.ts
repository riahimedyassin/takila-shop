import { Company } from "../../enteties/Company.entity";
import { IRepository } from "../../types/IRepository";

export interface CompanyRepository extends IRepository<Company> {
    findByName(name : string ) : Promise<Company | null> ; 
}