import { DatabaseService } from "../services/DB/DatabaseService";
import {
  ObjectLiteral,
  ObjectType,
  Repository,
  UpdateResult,
  DeleteResult,
} from "typeorm";
import { IRepository } from "../types/IRepository";
import { DatabaseServiceImpl } from "../services/DB/DatabaseServiceImpl";
import { injectable } from "inversify";

/**
 * @class
 * @abstract
 * @classdesc Generic class that provide the basic repository implementations
 * @implements {IRepository<T>}
 * @template T The expected Entity Handled by the repository
 * @extends {Repository<T extends ObjectLiteral>}
 */
@injectable()
export abstract class BaseRepository<T extends ObjectLiteral>
  extends Repository<T>
  implements IRepository<T>
{
  constructor(
    private readonly entity: ObjectType<T>,
    private readonly dbService: DatabaseService = new DatabaseServiceImpl()
  ) {
    super(entity, dbService.db.createEntityManager());
  }
  public async findAll(): Promise<T[]> {
    return this.find();
  }
  public async findByID(id: any): Promise<T | null> {
    return await this.findOneBy({id:id});
  }
  public async findOneAndUpdate(
    id: number,
    body: Partial<T>
  ): Promise<boolean> {
    return (await this.update(id, body)) instanceof UpdateResult;
  }
  public async findOneAndDelete(id: number): Promise<boolean> {
    return (await this.delete(id)) instanceof DeleteResult;
  }
  public async createRecord(body : any) : Promise<T> { 
      return await this.save(body)
  }

}

