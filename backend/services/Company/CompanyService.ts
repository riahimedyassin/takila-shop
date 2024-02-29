import { CompanyRegisterDTO } from "../../dto/Company/CompanyRegisterDTO";
import { Company } from "../../enteties/Company.entity";

export interface CompanyService {
    create(body : CompanyRegisterDTO) : Promise<Company> ; 
    findByName(name : string ) : Promise<Company|null>
}