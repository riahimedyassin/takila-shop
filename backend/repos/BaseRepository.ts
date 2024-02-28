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
import { log } from "console";

/**
 * @abstract
 * @description Generic class that provide the basic repository implementations
 * @implements {IRepository<T>}
 * @extends {Repository<T>}
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
  /**
   * @description Get all records
   * @returns {Promise<T[]>}
   */
  public async findAll(): Promise<T[]> {
    return this.find();
  }
  /**
   * @description Get single record by ID
   * @param id
   * @returns {Promise<T | null>}
   */
  public async findByID(id: any): Promise<T | null> {
    return await this.findOneBy({id:id});
  }
  /**
   * @description Update a record
   * @param {number} id
   * @param {Partial<T>} body
   * @returns {boolean}
   */
  public async findOneAndUpdate(
    id: number,
    body: Partial<T>
  ): Promise<boolean> {
    return (await this.update(id, body)) instanceof UpdateResult;
  }
  /**
   * @description Delete a single record by ID
   * @param {number} id
   * @returns {boolean}
   */
  public async findOneAndDelete(id: number): Promise<boolean> {
    return (await this.delete(id)) instanceof DeleteResult;
  }
  public async createRecord(body : any) : Promise<T> { 
      return await this.save(body)
  }

}

