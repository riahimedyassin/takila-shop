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

export class BaseRepository<T extends ObjectLiteral>
  extends Repository<T>
  implements IRepository<T>
{
  constructor(
    private readonly entity: ObjectType<T>,
    private readonly dbService: DatabaseService = new DatabaseServiceImpl(),
  ) {
    super(entity, dbService.db.createEntityManager());
  }
  public async find(): Promise<T[]> {
    return this.find();
  }
  public async findByID(id: any): Promise<T | null> {
    return await this.findOne(id);
  }
  public async findOneAndUpdate(
    id: number,
    body: Partial<T>
  ): Promise<boolean> {
    const updated = await this.update(id, body);
    return updated instanceof UpdateResult;
  }
  public async findOneAndDelete(id: number): Promise<boolean> {
    return (await this.delete(id)) instanceof DeleteResult;
  }
}
