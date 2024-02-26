import { ProductRegisterDTO } from "../../dto/Product/ProductRegisterDTO";
import { Product } from "../../enteties/Product.entity";

export interface ProductServie {
    save(body : ProductRegisterDTO) : Promise<Product>
}