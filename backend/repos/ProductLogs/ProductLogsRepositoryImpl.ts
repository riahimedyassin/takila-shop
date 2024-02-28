import { inject, injectable } from "inversify";
import { ProductLogsRepository } from "./ProductLogsRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/DB/DatabaseService";
import { ProductLogs } from "../../enteties/ProductLogs.entity";
import { BaseRepository } from "../BaseRepository";
import { DatabaseServiceImpl } from "../../services/DB/DatabaseServiceImpl";

@injectable()
export class ProductLogsRepositoryImpl extends BaseRepository<ProductLogs> implements ProductLogsRepository {
  constructor(
    @inject(TYPES.DatabaseService) dbService: DatabaseService
  ) {
    super(ProductLogs)
  }
}
