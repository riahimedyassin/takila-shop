import { CompanyRegisterDTO } from "../../dto/Company/CompanyRegisterDTO";
import { Company } from "../../enteties/Company.entity";

/**
 * @interface
 * @description Company Service Interface
 */
export interface CompanyService {
  /**
   * @public
   * @async
   * @description Create new Company Entity
   * @param {CompanyRegisterDTO} body
   * @returns {Promise<Company>}
   */
  create(body: CompanyRegisterDTO): Promise<Company>;
  /**
   * @public
   * @async
   * @description Find Company By name
   * @param {string} name
   * @returns {Promise<Company |null>}
   */
  findByName(name: string): Promise<Company | null>;
  /**
   * @public
   * @async
   * @description Get all companies
   * @returns {Promise<Company[]>}
   */
  findAll(): Promise<Company[]>;
  /**
   * @public
   * @async
   * @param {number} id
   * @returns {Promise<Company | null>} 
   */
  findByID(id: number): Promise<Company | null>;
    /**
   * @public
   * @async
   * @param {number} id
   * @param {any} body
   * @returns {Promise<boolean>} 
   */
  update(id: number, body: any): Promise<boolean>;
    /**
   * @public
   * @async
   * @param {number} id
   * @returns {Promise<boolean>} 
   */
  delete(id: number): Promise<boolean>;
}
