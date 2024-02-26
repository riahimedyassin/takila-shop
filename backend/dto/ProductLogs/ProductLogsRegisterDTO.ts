import { Admin } from "../../enteties/Admin.entity";
import { Product } from "../../enteties/Product.entity";

export class ProductLogsRegisterDTO {
    product_id : Product ;
    admin : Admin
    constructor(
        product_id : Product, admin : Admin
    ){
        this.product_id=product_id;
        this.admin=admin
    }
}