import { Product } from "../../enteties/Product.entity";
import { Rating } from "../../enteties/Rating.entity";
import { IRepository } from "../../types/IRepository";

/**
 * @interface
 * @description Rating Repository Interface
 * @extends {IRepository<Rating>}
 */
export interface RatingRepository extends IRepository<Rating> {
    /**
     * @public
     * @async
     * @description Get All the Rating for a given product
     * @param product 
     * @returns {Promise<Rating[]>}
     */
    findByProduct(product : Product) : Promise<Rating[]>
    /**
     * @public
     * @async
     * @description Get The total score of rating for a product
     * @param product 
     */
    getProductScoreCount(product : Product) : Promise<number>
}