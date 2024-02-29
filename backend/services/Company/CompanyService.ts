import { CompanyRegisterDTO } from "../../dto/Company/CompanyRegisterDTO";
import { Company } from "../../enteties/Company.entity";

/**
 * @interface 
 * @description Company Service Interface
 */
export interface CompanyService {
    create(body : CompanyRegisterDTO) : Promise<Company> ; 
    findByName(name : string ) : Promise<Company|null>
}