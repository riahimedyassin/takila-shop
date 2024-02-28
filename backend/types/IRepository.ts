import { ObjectLiteral } from "typeorm";


/**
 * @interface 
 * @description Base repository interface used to declare inversify instance injected methods
 */
export interface IRepository<T extends ObjectLiteral> {
  findByID(id: any): Promise<T | null>;
  findOneAndUpdate(id: number, body: Partial<T>): Promise<boolean>;
  find(): Promise<T[]>;
  findOneAndDelete(id: number): Promise<boolean>;
  createRecord(body : any) : Promise<T> ;
}
