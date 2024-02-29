import { Company } from "../../enteties/Company.entity";
import { IRepository } from "../../types/IRepository";


/**
 * @interface
 * @extends {IRepository<Company>}
 * @description Company Repository Interface
 */
export interface CompanyRepository extends IRepository<Company> {
    /**
     * @public
     * @async
     * @description Get Company By Name ; 
     * @param {string} name 
     * @returns {Promise<Company | null>}
     */
    findByName(name : string ) : Promise<Company | null> ; 
}