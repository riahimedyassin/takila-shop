import { controller, httpPost, requestBody } from "inversify-express-utils";
import { ProductRegisterDTO } from "../dto/Product/ProductRegisterDTO";
import { inject } from "inversify";
import { TYPES } from "../constants/TYPES";
import { DatabaseService } from "../services/DB/DatabaseService";
import { bodyValidation } from "../helpers/BodyValidation";
import { validate } from "class-validator";
import { ProductServie } from "../services/Product/ProductService";

@controller("/api/takila/v1")
export class ProductController {
  constructor(
    @inject(TYPES.ProductService)
    private readonly _productService: ProductServie
  ) {}
  @httpPost("/")
  public async addProduct(@requestBody() body: ProductRegisterDTO) {
    bodyValidation(await validate(body));
    const product = await this._productService.create(body);
    return product 
  }
}
