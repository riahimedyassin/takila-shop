import { Admin } from "../../enteties/Admin.entity";
import { Product } from "../../enteties/Product.entity";

/**
 * @interface
 * @description Product Service Interface
 */
export interface ProductServie {
    create(product : Partial<Product> , admin : Admin) : Promise<Product>
}