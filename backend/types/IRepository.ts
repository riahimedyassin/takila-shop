import { ObjectLiteral } from "typeorm";

export interface IRepository<T extends ObjectLiteral> {
  findByID(id: any): Promise<T | null>;
  findOneAndUpdate(id: number, body: Partial<T>): Promise<boolean>;
  find(): Promise<T[]>;
  findOneAndDelete(id: number): Promise<boolean>;
  save(body : Partial<T>) : Promise<T> ;
}
