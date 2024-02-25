import { Repository } from "typeorm";
import { Product } from "../../enteties/Product.entity";
import { IRepository } from "../../types/IRepository";

export interface ProductRepository extends IRepository<Product> {
    repos : Repository<Product>
}