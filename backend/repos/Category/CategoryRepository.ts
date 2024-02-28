import { Category } from "../../enteties/Category.entity";
import { IRepository } from "../../types/IRepository";

/**
 * @interface
 * @descreption Category Repository Interface
 * @extends {IRepository<Category>}
 */
export interface CategoryRepository extends IRepository<Category> {
    /**
     * @public
     * @async
     * @param {string} name 
     * @returns {Promise<Category|null>}
     */
    findOneByName(name : string ) : Promise<Category|null>
}