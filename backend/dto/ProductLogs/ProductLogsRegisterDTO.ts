import { Admin } from "../../enteties/Admin.entity";
import { Product } from "../../enteties/Product.entity";
import { ProductRegisterDTO } from "../Product/ProductRegisterDTO";

export class ProductLogsRegisterDTO {
    product_id : ProductRegisterDTO ;
    admin : Admin
    constructor(
        product_id : ProductRegisterDTO, admin : Admin
    ){
        this.product_id=product_id;
        this.admin=admin
    }
}