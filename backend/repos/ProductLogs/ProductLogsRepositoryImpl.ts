import { inject } from "inversify";
import { ProductLogsRepository } from "./ProductLogsRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/DB/DatabaseService";
import { ProductLogs } from "../../enteties/ProductLogs.entity";
import { BaseRepository } from "../BaseRepository";

export class ProductLogsRepositoryImpl extends BaseRepository<ProductLogs> implements ProductLogsRepository {
  constructor(
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService
  ) {
    super(ProductLogs)
  }
}
