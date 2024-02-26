import { inject } from "inversify";
import { TYPES } from "../constants/TYPES";
import { DatabaseService } from "../services/DB/DatabaseService";
import {
  ObjectLiteral,
  ObjectType,
  Repository,
  FindOneOptions,
  FindOptionsWhere,
  UpdateResult,
  DeleteResult
} from "typeorm";
import { IRepository } from "../types/IRepository";

export class BaseRepository<T extends ObjectLiteral> extends Repository<T> implements IRepository<T> {
  constructor(
    @inject(TYPES.DatabaseService) private readonly dbService: DatabaseService,
    private readonly entity: ObjectType<T> 
  ) {
    super(entity, dbService.db.createEntityManager());
  }
  public async find(): Promise<T[]> {
    return this.dbService.db.manager.find(this.entity);
  }
  public async findByID(id: any): Promise<T | null> {
    return await this.dbService.db.manager.findOne(this.entity,id);
  }
  public async findOneAndUpdate(id: number, body: Partial<T>): Promise<boolean> {
    const updated = await this.dbService.db.manager.update(this.entity,id,body); 
    return updated instanceof UpdateResult
  }
  public async findOneAndDelete(id:number) : Promise<boolean> {
    return (await this.dbService.db.manager.delete(this.entity,id)) instanceof DeleteResult
  }

  

}
