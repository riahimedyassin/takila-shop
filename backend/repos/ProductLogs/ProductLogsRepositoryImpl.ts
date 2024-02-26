import { inject } from "inversify";
import { ProductLogsRepository } from "./ProductLogsRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/DB/DatabaseService";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ProductLogs } from "../../enteties/ProductLogs.entity";

export class ProductLogsRepositoryImpl implements ProductLogsRepository {
  repos: Repository<ProductLogs>;
  constructor(
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService
  ) {
    this.repos = this._dbService.manager.getRepository(ProductLogs);
  }
  public async find(): Promise<ProductLogs[]> {
    return await this.repos.find();
  }
  public async findByID(id: number): Promise<ProductLogs> {
    return (await this.repos.findBy({ id }))[0];
  }
  public async findOneAndDelete(id: number): Promise<boolean> {
    return (await this.repos.delete({ id })) instanceof DeleteResult;
  }
  public async findOneAndUpdate(
    id: number,
    body: Partial<ProductLogs>
  ): Promise<boolean> {
    return (await this.repos.update({ id }, body)) instanceof UpdateResult;
  }
  public async save(body: Partial<ProductLogs>): Promise<ProductLogs> {
    return await this.repos.save(body);
  }
}
