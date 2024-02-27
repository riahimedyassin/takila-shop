import { inject, injectable } from "inversify";
import { ProductRepository } from "./ProductRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/DB/DatabaseService";
import { Product } from "../../enteties/Product.entity";
import { BaseRepository } from "../BaseRepository";

@injectable()
export class ProductRepositoryImpl
  extends BaseRepository<Product>
  implements ProductRepository
{
  constructor(
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService
  ) {
    super(Product);
  }
}
