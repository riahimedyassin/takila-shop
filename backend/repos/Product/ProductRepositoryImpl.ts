import { inject, injectable } from "inversify";
import { ProductRepository } from "./ProductRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/DB/DatabaseService";
import { Product } from "../../enteties/Product.entity";
import { BaseRepository } from "../BaseRepository";
import { Category } from "../../enteties/Category.entity";
import { ProductGlobalResponse } from "../../dto/Product/ProductGlobalResponse";

@injectable()
export class ProductRepositoryImpl
  extends BaseRepository<Product>
  implements ProductRepository
{
  constructor(
    @inject(TYPES.DatabaseService) dbService: DatabaseService
  ) {
    super(Product);
  }
  public async findAllByCategory(category : Category) : Promise<ProductGlobalResponse[]>  {
      const products = await this.findBy({category:category});
      return products ; 
  }
}
