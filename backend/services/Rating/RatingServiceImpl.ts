import { inject, injectable } from "inversify";
import { RatingService } from "./RatingService";
import { TYPES } from "../../constants/TYPES";
import { RatingRepository } from "../../repos/Rating/RatingRepository";
import { ProductServie } from "../Product/ProductService";
import { BaseHttpError } from "../../errors/BaseHttpError";
import { StatusCodes } from "http-status-codes";
import { Rating } from "../../enteties/Rating.entity";

@injectable()
export class RatingServiceImpl implements RatingService {
  constructor(
    @inject(TYPES.RatingRepository)
    private readonly _ratingRepository: RatingRepository,
    @inject(TYPES.ProductService) private readonly _productService : ProductServie
  ) {}
  public async getProductRatingScore(id : number) : Promise<number> {
    const product = await this._productService.findOneByID(id); 
    if(!product) throw new BaseHttpError("Product Not Found",StatusCodes.NOT_FOUND); 
    return await this._ratingRepository.getProductScoreCount(product);
  }
  public async getProductRating(id: number): Promise<Rating[]> {
    const product = await this._productService.findOneByID(id); 
    if(!product) throw new BaseHttpError("Product Not Found",StatusCodes.NOT_FOUND);  
    return await this._ratingRepository.findByProduct(product); 
  }
  
}
