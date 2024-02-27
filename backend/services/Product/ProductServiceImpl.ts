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

@injectable()
export class ProductServiceImpl implements ProductServie {
  constructor(
    @inject(TYPES.ProductRepository)
    private readonly _productRepos: ProductRepository,
    @inject(TYPES.ProductLogsService)
    private readonly _productLogsService: ProductLogsService,
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService
  ) {}
  /**
   * @description Save the product to the database
   * @async
   * @private
   * @param {ProductRegisterDTO} body
   * @returns {Promise<Product>}
   */
  private async save(body: ProductRegisterDTO): Promise<Product> {
    const product = await this._productRepos.save(body);
    return product;
  }
  /**
   * @description Create a product and its first product log
   * @async
   * @param {Product} product
   * @param {Admin} admin
   * @returns {Promise<Product>}
   */
  public async create(product: ProductRegisterDTO, admin: Admin): Promise<Product> {
    const queryRunner = this._dbService.manager.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const prod = await this.save(product);
      const log = new ProductLogsRegisterDTO(product, admin);
      await this._productLogsService.save(log);
      await queryRunner.commitTransaction();
      return prod;
    } catch (error) {
      queryRunner.rollbackTransaction();
      throw error;
    }
  }
}
