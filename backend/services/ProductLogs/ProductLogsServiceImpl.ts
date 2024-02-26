import { inject } from "inversify";
import { ProductLogsService } from "./ProductLogsService";
import { TYPES } from "../../constants/TYPES";
import { ProductLogsRepository } from "../../repos/ProductLogs/ProductLogsRepository";
import { ProductLogs } from "../../enteties/ProductLogs.entity";

export class ProductLogsServiceImpl implements ProductLogsService {
  constructor(
    @inject(TYPES.ProductLogsRepository)
    private readonly _productLogsRepos: ProductLogsRepository
  ) {}
  public async save(body: Partial<ProductLogs>): Promise<ProductLogs> {
      return (await this._productLogsRepos.save(body))
  }
}
