import { Admin } from "../../enteties/Admin.entity";
import { Product } from "../../enteties/Product.entity";

export class ProductLogsRegisterDTO {
    product : Product ;
    admin : Admin
    constructor(
        product : Product, admin : Admin
    ){
        this.product=product;
        this.admin=admin
    }
}