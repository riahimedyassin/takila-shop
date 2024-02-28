import { inject, injectable } from "inversify";
import { ProductLogsService } from "./ProductLogsService";
import { TYPES } from "../../constants/TYPES";
import { ProductLogsRepository } from "../../repos/ProductLogs/ProductLogsRepository";
import { ProductLogs } from "../../enteties/ProductLogs.entity";
import { ProductLogsRegisterDTO } from "../../dto/ProductLogs/ProductLogsRegisterDTO";


@injectable()
export class ProductLogsServiceImpl implements ProductLogsService {
  constructor(
    @inject(TYPES.ProductLogsRepository)
    private readonly _productLogsRepos: ProductLogsRepository
  ) {}
  public async save(body: ProductLogsRegisterDTO): Promise<ProductLogs> {
      return (await this._productLogsRepos.createRecord(body))
  }
}
