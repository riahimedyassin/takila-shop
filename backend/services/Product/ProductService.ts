import { ProductGlobalResponse } from "../../dto/Product/ProductGlobalResponse";
import { ProductRegisterDTO } from "../../dto/Product/ProductRegisterDTO";
import { ProductUpdateDTO } from "../../dto/Product/ProductUpdateDTO";
import { Product } from "../../enteties/Product.entity";
import { BaseHttpError } from "../../errors/BaseHttpError";

/**
 * @interface
 * @description Product Service Interface
 */
export interface ProductServie {
    /**
   * @public
   * @async
   * @description Create a product and its first product log
   * @param {Product} product {@link Product}
   * @param {number} admin_id
   * @returns {Promise<Product>} Check {@link Product}
   */
    create(product : ProductRegisterDTO , admin_id : number) : Promise<Product>
    /**
   * @public
   * @async
   * @param {number} id 
   * @returns {Promise<boolean>}
   */
    delete(id : number ) : Promise<boolean> ; 
    /**
     * @public
     * @async
     * @description Update a Product 
     * @param {number} id Prdouct Admin
     * @param body Base Product Update DTO
     * @returns {Promise<boolean>} 
     */
    update(id: number , body : Partial<ProductUpdateDTO> ) : Promise<boolean>;
    /**
   * @public
   * @async
   * @description Return all the products
   * @returns {ProductGlobalResponse[]} Check {@link ProductGlobalResponse}
   */
    findAll() : Promise<ProductGlobalResponse[]>
    /**
     * @public
     * @async
     * @description Find a Product by id
     * @param {number} id 
     * @returns {Promise<Product | null >} Check {@link Product}
     * 
     */
    findOneByID(id : number) : Promise<Product | null >  ; 
    /**
     * @public
     * @async
     * @description Get Products by title
     * @param {string} company Company Title 
     * @returns {Promise<ProductGlobalResponse[]>} Check {@link ProductGlobalResponse}
     * @throws {BaseHttpError} 404 Company Not Found
     */
    findAllByCompany(company : string ) : Promise<ProductGlobalResponse[]> ; 
    /**
   * @public
   * @async
   * @description Return all the products of a given category
   * @param {string} category 
   * @returns {Promise<ProductGlobalResponse[]>} Check {@link ProductGlobalResponse}
   * @throws {BaseHttpError} 404 Company Not Found
   */
    findAllByCategory(category : string ) : Promise<ProductGlobalResponse[]> ; 
    /**
     * @public
     * @async
     * @description Return all the products of a given company and category
     * @param {string} category Category Name
     * @param {string} company Company Name
     * @returns {Promise<ProductGlobalResponse[]>}
     * @throws {BaseHttpError} Company or Category Not found 
     */
    findByCategoryAndCompany(category : string , company : string) : Promise<ProductGlobalResponse[]>
    findByRating(range:[number,number]) : Promise<ProductGlobalResponse[]>
    /**
     * @public
     * @async
     * @description Return True if there is a product with the given ID
     * @param {number} id Product ID
     * @returns {Promise<boolean>}
     * @ignore
     */
    exist(id : number) : Promise<boolean>
} 