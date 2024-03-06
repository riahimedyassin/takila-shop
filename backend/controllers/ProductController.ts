import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  queryParam,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { ProductRegisterDTO } from "../dto/Product/ProductRegisterDTO";
import { inject } from "inversify";
import { TYPES } from "../constants/TYPES";
import { validateOrReject } from "class-validator";
import { ProductServie } from "../services/Product/ProductService";
import { BaseHttpDataResponse } from "../helpers/BaseHttpMessageResponse";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { BaseHttpError } from "../errors/BaseHttpError";
import { ProductUpdateDTO } from "../dto/Product/ProductUpdateDTO";
import { BaseHttpResponse } from "../helpers/BaseHttpResponse";
import { ProductGlobalResponse } from "../dto/Product/ProductGlobalResponse";

@controller("/api/takila/v1/products")
export class ProductController extends BaseHttpController {
  constructor(
    @inject(TYPES.ProductService)
    private readonly _productService: ProductServie
  ) {
    super();
  }
  @httpPost("/",TYPES.AdminAuthMiddleware)
  public async addProduct(@requestBody() body: any) {
    await validateOrReject(ProductRegisterDTO.fromAny(body));
    const id = <string>this.httpContext.response.get("id");
    const product = await this._productService.create(body, +id);
    return product;
  }
  @httpGet("/")
  public async getAllProducts(
    @queryParam("company") company: string,
    @queryParam("category") category: string
  ) {
    let products: ProductGlobalResponse[];
    if (!company && !category) {
      products = await this._productService.findAll();
      return new BaseHttpDataResponse(
        "Products Retrieved Successfully",
        StatusCodes.OK,
        products
      );
    }
    if (!category) {
      products = await this._productService.findAllByCompany(company);
    } else {
      products = await this._productService.findAllByCategory(category);
    }
    return new BaseHttpDataResponse(
      "Products Retrieved Successfully",
      StatusCodes.OK,
      products
    );
  }
  @httpGet("/:id")
  public async getSingleProduct(@requestParam("id") id: number) {
    const product = await this._productService.findOneByID(id);
    if (!product)
      throw new BaseHttpError("Product Not Found", StatusCodes.NOT_FOUND);
    return new BaseHttpDataResponse(
      "Product Retreived Successfully",
      StatusCodes.OK,
      product
    );
  }
  @httpPatch("/:id")
  public async updateProduct(
    @requestBody() body: Partial<ProductUpdateDTO>,
    @requestParam("id") id: number
  ) {
    const isUpdated = await this._productService.update(id, body);
    if (isUpdated)
      return new BaseHttpResponse(
        "Product updated successfully",
        StatusCodes.ACCEPTED
      );
    throw new BaseHttpError(
      "Could not update product",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  @httpDelete('/:id') 
  public async deleteProduct(
    @requestParam('id') id : number
  ) {
      const deleted = await this._productService.delete(id);
      if(!deleted) return new BaseHttpResponse(ReasonPhrases.NO_CONTENT,StatusCodes.NO_CONTENT)
      throw new BaseHttpError("Could not delete product",StatusCodes.INTERNAL_SERVER_ERROR)
  }
}
