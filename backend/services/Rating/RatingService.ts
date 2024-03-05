import { Rating } from "../../enteties/Rating.entity"

export interface RatingService {
    /**
     * @public
     * @async
     * @description Return the product score count (if exists)
     * @param {number} id Product ID 
     * @returns {Promise<number>}
     */
    getProductRatingScore(id : number) : Promise<number>
    /**
     * @public
     * @async
     * @description Get Product All Ratings (if exists)
     * @param {number} id Product ID 
     * @todo Validate if the product rating should eager a user or not
     */
    getProductRating(id : number) : Promise<Rating[]>
    // findByRange(range : [number,number]) : Promise<Rating[]>
}