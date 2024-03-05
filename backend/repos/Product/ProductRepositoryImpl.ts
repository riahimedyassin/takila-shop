import { inject, injectable } from "inversify";
import { ProductRepository } from "./ProductRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/DB/DatabaseService";
import { Product } from "../../enteties/Product.entity";
import { BaseRepository } from "../BaseRepository";
import { Category } from "../../enteties/Category.entity";
import { Company } from "../../enteties/Company.entity";
import { Between, MoreThan } from "typeorm";

/**
 * @class 
 * @extends {BaseRepository<Product>}
 * @implements {ProductRepository<Product>}
 * @classdesc Product Repository Implementation
 */
@injectable()
export class ProductRepositoryImpl
  extends BaseRepository<Product>
  implements ProductRepository
{
  constructor(@inject(TYPES.DatabaseService) dbService: DatabaseService) {
    super(Product);
  }
  public async findAllByCategory(category: Category): Promise<Product[]> {
    const products = await this.findBy({ category: category });
    return products;
  }
  public async findAllByCompany(company: Company): Promise<Product[]> {
    const products = await this.findBy({ company: company });
    return products;
  }
  public async findByCategoryAndCompany(category : Category , company : Company ) : Promise<Product[]> {
    const products = await this.findBy({company:company,category:category})
    return products ; 
  }
  public async findByRating(rating : [number,number]) : Promise<Product[]> {
    const products = await this.find({where : {rating : Between(rating[0],rating[1])}})
    return products ; 
  }
}
