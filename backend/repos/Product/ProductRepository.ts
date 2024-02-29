import { ProductGlobalResponse } from "../../dto/Product/ProductGlobalResponse";
import { Category } from "../../enteties/Category.entity";
import { Company } from "../../enteties/Company.entity";
import { Product } from "../../enteties/Product.entity";
import { IRepository } from "../../types/IRepository";

/**
 * @interface 
 * @extends {IRepository<Product>}
 * @description Product Repository Interface
 */
export interface ProductRepository extends IRepository<Product> {
    /**
     * @public 
     * @async
     * @description Get Products By Category
     * @param {Category} category Category Object
     * @returns {ProductGlobalResponse[]}
     */
    findAllByCategory(category : Category) : Promise<Product[]>; 
    /**
     * @public
     * @async
     * @description Get Products By Company
     * @param company 
     */
    findAllByCompany(company : Company) : Promise<Product[]> ; 
}
