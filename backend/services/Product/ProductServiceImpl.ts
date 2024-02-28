import { inject, injectable } from "inversify";
import { ProductServie } from "./ProductService";
import { TYPES } from "../../constants/TYPES";
import { ProductRegisterDTO } from "../../dto/Product/ProductRegisterDTO";
import { ProductRepository } from "../../repos/Product/ProductRepository";
import { ProductLogsService } from "../ProductLogs/ProductLogsService";
import { ProductLogsRegisterDTO } from "../../dto/ProductLogs/ProductLogsRegisterDTO";
import { Product } from "../../enteties/Product.entity";
import { Admin } from "../../enteties/Admin.entity";
import { DatabaseService } from "../DB/DatabaseService";
import { AdminService } from "../Admin/AdminService";
import { BaseHttpError } from "../../errors/BaseHttpError";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ProductGlobalResponse } from "../../dto/Product/ProductGlobalResponse";
import { ProductUpdateDTO } from "../../dto/Product/ProductUpdateDTO";
import { CategoryService } from "../Category/CategoryService";

/**
 * @class
 * @implements {ProductServie}
 * @description Product Service Implementation
 */
@injectable()
export class ProductServiceImpl implements ProductServie {
  constructor(
    @inject(TYPES.ProductRepository)
    private readonly _productRepos: ProductRepository,
    @inject(TYPES.ProductLogsService)
    private readonly _productLogsService: ProductLogsService,
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService,
    @inject(TYPES.AdminService) private readonly _adminService: AdminService,
    @inject(TYPES.CategoryService)
    private readonly _categoryService: CategoryService
  ) {}
  public async create(
    product: ProductRegisterDTO,
    admin: number
  ): Promise<Product> {
    const queryRunner = this._dbService.manager.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const updated_by = await this._adminService.findOneByID(admin);
      if (!updated_by)
        throw new BaseHttpError(
          ReasonPhrases.UNAUTHORIZED,
          StatusCodes.UNAUTHORIZED
        );
      const prod = await this._productRepos.createRecord(product);
      const log = new ProductLogsRegisterDTO(product, updated_by);
      await this._productLogsService.save(log);
      await queryRunner.commitTransaction();
      return prod;
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw error;
    }
  }

  public async delete(id: number): Promise<boolean> {
    return await this._productRepos.findOneAndDelete(id);
  }

  public async findAll(): Promise<ProductGlobalResponse[]> {
    return await this._productRepos.findAll();
  }

  public async findAllByCategory(
    category: string
  ): Promise<ProductGlobalResponse[]> {
    const categ = await this._categoryService.findOneByName(category);
    if (!categ)
      throw new BaseHttpError("Category not found", StatusCodes.NOT_FOUND);
    const products = await this._productRepos.findAllByCategory(categ);
    return products;
  }
  public async findAllByCompany(
    company: string
  ): Promise<ProductGlobalResponse[]> {}
  public async findOneByID(id: number): Promise<Product | null> {}
  public async update(
    id: number,
    body: Partial<ProductUpdateDTO>
  ): Promise<boolean> {}
}
