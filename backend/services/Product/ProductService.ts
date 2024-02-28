import { ProductGlobalResponse } from "../../dto/Product/ProductGlobalResponse";
import { ProductUpdateDTO } from "../../dto/Product/ProductUpdateDTO";
import { Product } from "../../enteties/Product.entity";

/**
 * @interface
 * @description Product Service Interface
 */
export interface ProductServie {
    /**
   * @public
   * @async
   * @description Create a product and its first product log
   * @param {Product} product
   * @param {Admin} admin
   * @returns {Promise<Product>}
   */
    create(product : Partial<Product> , id : number) : Promise<Product>
    /**
   * @public
   * @async
   * @param {number} id 
   * @returns {Promise<boolean>}
   */
    delete(id : number ) : Promise<boolean> ; 
    update(id: number , body : Partial<ProductUpdateDTO> ) : Promise<boolean>;
    /**
   * @public
   * @async
   * @description Return all the products
   * @returns {ProductGlobalResponse[]}
   */
    findAll() : Promise<ProductGlobalResponse[]>
    findOneByID(id : number) : Promise<Product | null >  ; 
    findAllByCompany(company : string ) : Promise<ProductGlobalResponse[]> ; 
    /**
   * @public
   * @async
   * @description Return all the products of a given category
   * @param {string} category 
   * @returns {ProductGlobalResponse[]}
   */
    findAllByCategory(category : string ) : Promise<ProductGlobalResponse[]> ; 

}