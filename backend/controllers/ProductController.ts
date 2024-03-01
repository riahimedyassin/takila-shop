import { BaseHttpController, controller, httpGet, httpPatch, httpPost, requestBody, requestParam } from "inversify-express-utils";
import { ProductRegisterDTO } from "../dto/Product/ProductRegisterDTO";
import { inject } from "inversify";
import { TYPES } from "../constants/TYPES";
import { DatabaseService } from "../services/DB/DatabaseService";
import { bodyValidation } from "../helpers/BodyValidation";
import { validate } from "class-validator";
import { ProductServie } from "../services/Product/ProductService";
import { BaseHttpDataResponse } from "../helpers/BaseHttpMessageResponse";
import { StatusCodes } from "http-status-codes";
import { BaseHttpError } from "../errors/BaseHttpError";
import { ProductUpdateDTO } from "../dto/Product/ProductUpdateDTO";
import { BaseHttpResponse } from "../helpers/BaseHttpResponse";

@controller("/api/takila/v1/products")
export class ProductController extends BaseHttpController {
  constructor(
    @inject(TYPES.ProductService)
    private readonly _productService: ProductServie
  ) {
    super()
  }
  @httpPost("/")
  public async addProduct(@requestBody() body: ProductRegisterDTO) {
    bodyValidation(await validate(body));
    // const product = await this._productService.create(body);
    // return product 
  }
  @httpGet("/")
  public async getAllProducts() {
    const products = await this._productService.findAll(); 
    return new BaseHttpDataResponse("Products Retrieved Successfully",StatusCodes.OK,products) ; 
  }
  @httpGet("/:id")
  public async getSingleProduct(
    @requestParam("id") id : number
  ) {
    const product = await this._productService.findOneByID(id); 
    if(!product) throw new BaseHttpError("Product Not Found",StatusCodes.NOT_FOUND);
    return new BaseHttpDataResponse("Product Retreived Successfully",StatusCodes.OK,product); 
  }
  @httpPatch("/:id")
  public async updateProduct(
    @requestBody() body : Partial<ProductUpdateDTO> , 
    @requestParam("id") id : number
  ){
    const isUpdated = await this._productService.update(id,body); 
    if(isUpdated) return new BaseHttpResponse("Product updated successfully",StatusCodes.ACCEPTED); 
    throw new BaseHttpError("Could not update product",StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
