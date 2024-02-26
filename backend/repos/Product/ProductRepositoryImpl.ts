import { inject, injectable } from "inversify";
import { ProductRepository } from "./ProductRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/DB/DatabaseService";
import { Product } from "../../enteties/Product.entity";
import { DeleteResult, Repository, UpdateDateColumn } from "typeorm";

@injectable()
export class ProductRepositoryImpl implements ProductRepository {
  repos: Repository<Product>;
  constructor(
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService
  ) {
    this.repos = this._dbService.db.getRepository(Product);
  }
  public async find(): Promise<Product[]> {
    return await this.repos.find();
  }
  public async findByID(id: number): Promise<Product> {
    return (await this.repos.findBy({ id }))[0];
  }
  public async findOneAndDelete(id: number): Promise<boolean> {
    const deleted = await this.repos.delete({ id });
    return deleted instanceof DeleteResult;
  }
  public async findOneAndUpdate(
    id: number,
    body: Partial<Product>
  ): Promise<boolean> {
    const updated = await this.repos.update({ id }, body);
    return updated instanceof UpdateDateColumn;
  }
  public async save(body: Partial<Product>): Promise<Product> {
    const saved = await this.repos.save(body);
    return saved;
  }
}
