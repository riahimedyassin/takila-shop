import { inject, injectable } from "inversify";
import { ProductRepository } from "./ProductRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/DB/DatabaseService";
import { Product } from "../../enteties/Product.entity";
import { BaseRepository } from "../BaseRepository";
import { DatabaseServiceImpl } from "../../services/DB/DatabaseServiceImpl";

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
}
