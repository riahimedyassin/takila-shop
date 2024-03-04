import { inject, injectable } from "inversify";
import { ProductServie } from "./ProductService";
import { TYPES } from "../../constants/TYPES";
import { ProductRegisterDTO } from "../../dto/Product/ProductRegisterDTO";
import { ProductRepository } from "../../repos/Product/ProductRepository";
import { ProductLogsService } from "../ProductLogs/ProductLogsService";
import { ProductLogsRegisterDTO } from "../../dto/ProductLogs/ProductLogsRegisterDTO";
import { Product } from "../../enteties/Product.entity";
import { DatabaseService } from "../DB/DatabaseService";
import { AdminService } from "../Admin/AdminService";
import { BaseHttpError } from "../../errors/BaseHttpError";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ProductGlobalResponse } from "../../dto/Product/ProductGlobalResponse";
import { ProductUpdateDTO } from "../../dto/Product/ProductUpdateDTO";
import { CategoryService } from "../Category/CategoryService";
import { CompanyService } from "../Company/CompanyService";

/**
 * @class
 * @implements {ProductServie}
 * @classdesc Product Service Implementation
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
    private readonly _categoryService: CategoryService,
    @inject(TYPES.CompanyService)
    private readonly _companyService: CompanyService
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
      await this._productLogsService.create(log);
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
    return (await this._productRepos.findAll()).map((product) =>
      ProductGlobalResponse.toProductGlobaResponse(product)
    );
  }

  public async findAllByCategory(
    category: string
  ): Promise<ProductGlobalResponse[]> {
    const categ = await this._categoryService.findOneByName(category);
    if (!categ)
      throw new BaseHttpError("Category not found", StatusCodes.NOT_FOUND);
    const products = await this._productRepos.findAllByCategory(categ);
    return products.map((product) =>
      ProductGlobalResponse.toProductGlobaResponse(product)
    );
  }
  public async findAllByCompany(
    company: string
  ): Promise<ProductGlobalResponse[]> {
    const comp = await this._companyService.findByName(company);
    if (!comp)
      throw new BaseHttpError("Company Not Found", StatusCodes.NOT_FOUND);
    const prodcuts = await this._productRepos.findAllByCompany(comp);
    return prodcuts.map((product) =>
      ProductGlobalResponse.toProductGlobaResponse(product)
    );
  }
  public async findOneByID(id: number): Promise<Product | null> {
    const product = await this._productRepos.findByID(id);
    return product;
  }
  public async update(
    id: number,
    body: Partial<ProductUpdateDTO>
  ): Promise<boolean> {
    return await this._productRepos.findOneAndUpdate(id, body);
  }
  public async findByCategoryAndCompany(category: string, company: string): Promise<ProductGlobalResponse[]> {
      const comp = await this._companyService.findByName(company); 
      if(!comp) throw new BaseHttpError('Company Not Found',StatusCodes.NOT_FOUND)
      const categ = await this._categoryService.findOneByName(category); 
      if(!categ) throw new BaseHttpError('Category Not Found',StatusCodes.NOT_FOUND); 
      const products = await this._productRepos.findByCategoryAndCompany(categ,comp); 
      return products.map((prodcut)=> ProductGlobalResponse.toProductGlobaResponse(prodcut)) ; 
  }
  public async findByRating(range: [number, number]): Promise<ProductGlobalResponse[]> {
       
  }
  public async exist(id: number): Promise<boolean> {
      return await this.findOneByID(id)!=null ; 
  }
}
