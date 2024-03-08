import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPatch,
  httpPost,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { TYPES } from "../constants/TYPES";
import { CategoryService } from "../services/Category/CategoryService";
import { BaseHttpDataResponse } from "../helpers/BaseHttpMessageResponse";
import { StatusCodes } from "http-status-codes";
import { BaseHttpError } from "../errors/BaseHttpError";
import { CategoryDTO } from "../dto/Category/CategoryDTO";
import { validateOrReject } from "class-validator";
import { BaseHttpResponse } from "../helpers/BaseHttpResponse";

@controller("/api/takila/v1/categories")
export class CategoryController {
  constructor(
    @inject(TYPES.CategoryService)
    private readonly _categoryService: CategoryService
  ) {}
  @httpGet("")
  public async findAll() {
    const categories = await this._categoryService.findAll();
    return new BaseHttpDataResponse(
      "Categories retrieved successfulyy",
      StatusCodes.OK,
      categories
    );
  }
  @httpGet("/:name")
  public async findOneByID(@requestParam("name") name: string) {
    const category = await this._categoryService.findOneByName(name);
    if (!category)
      return new BaseHttpError("Category not found", StatusCodes.NOT_FOUND);
    return new BaseHttpDataResponse(
      "Category Retreived Successfully",
      StatusCodes.OK,
      category
    );
  }
  @httpPost("")
  public async create(@requestBody() body: any) {
    const category = CategoryDTO.fromAny(body);
    await validateOrReject(category);
    const res = await this._categoryService.create(category);
    return new BaseHttpDataResponse(
      "Category Created Successfully",
      StatusCodes.CREATED,
      category
    );
  }
  @httpPatch("/:id")
  public async update(
    @requestParam("id") id: number,
    @requestBody() body: any
  ) {
    if (isNaN(id))
      return new BaseHttpError("Invalid ID", StatusCodes.BAD_REQUEST);
    const changes = CategoryDTO.fromAny(body);
    await validateOrReject(changes, { skipMissingProperties: true });
    const res = await this._categoryService.update(id, changes);
    if (!res)
      return new BaseHttpError(
        "Cannot update category",
        StatusCodes.NOT_MODIFIED
      );
    return new BaseHttpResponse(
      "Category Updated Successfully",
      StatusCodes.NO_CONTENT
    );
  }
}
