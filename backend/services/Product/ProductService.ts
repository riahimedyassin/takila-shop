import { Admin } from "../../enteties/Admin.entity";
import { ProductRegisterDTO } from "../../dto/Product/ProductRegisterDTO";
import { Product } from "../../enteties/Product.entity";

export interface ProductServie {
    create(product : Partial<Product> , admin : Admin) : Promise<Product>
}