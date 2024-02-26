import { inject, injectable } from "inversify";
import { ProductServie } from "./ProductService";
import { TYPES } from "../../constants/TYPES";
import { ProductRegisterDTO } from "../../dto/Product/ProductRegisterDTO";
import { ProductRepository } from "../../repos/Product/ProductRepository";

@injectable()
export class ProductServiceImpl implements ProductServie {
    constructor(
        @inject(TYPES.ProductRepository) private readonly _productService : ProductRepository
    ){}
    public async save(body : ProductRegisterDTO) {
        const product = await this._productService.save(body); 
        return product ;
    } 
}