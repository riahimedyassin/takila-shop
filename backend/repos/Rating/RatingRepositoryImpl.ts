import { inject, injectable } from "inversify";
import { TYPES } from "../../constants/TYPES";
import { Rating } from "../../enteties/Rating.entity";
import { BaseRepository } from "../BaseRepository";
import { DatabaseService } from "../../services/DB/DatabaseService";
import { RatingRepository } from "./RatingRepository";
import { Product } from "../../enteties/Product.entity";

/**
 * @class
 * @classdesc Rating Repository Implementation
 * @extends {BaseRepository<Rating>}
 * @implements {RatingRepository}
 */
@injectable()
export class RatingRepositoryImpl extends BaseRepository<Rating> implements RatingRepository {
  /**
   * @constructor
   * @param {DatabaseService} dbService Auto Injected DB Service By Inversify
   */
  constructor(@inject(TYPES.DatabaseService) dbService: DatabaseService) {
    super(Rating);
  }
  public async findByProduct(product : Product) : Promise<Rating[]> {
    return await this.findBy({product}); 
  }
  public async getProductScoreCount(product : Product) : Promise<number> {
    return await this.count({where:{product:product}})
  }
}
