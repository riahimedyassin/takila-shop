import { ProductGlobalResponse } from "../../dto/Product/ProductGlobalResponse";
import { Category } from "../../enteties/Category.entity";
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
     * @param {Category} category Category Object
     * @returns {ProductGlobalResponse[]}
     */
    findAllByCategory(category : Category) : Promise<ProductGlobalResponse[]>
}
