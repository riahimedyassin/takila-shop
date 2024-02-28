import { ObjectLiteral } from "typeorm";

/**
 * @interface
 * @description Base repository interface used to declare inversify instance injected methods
 */
export interface IRepository<T extends ObjectLiteral> {
  /**
   * @public
   * @async
   * @description Get single record by ID
   * @param {number} id Entity<T> id
   * @returns {Promise<T | null>}
   */
  findByID(id: any): Promise<T | null>;
  /**
   * @public 
   * @async
   * @description Update a record
   * @param {number} id Entity<T> id
   * @param {Partial<T>} body Partia<Entity<T>> changes
   * @returns {Promise<boolean>}
   */
  findOneAndUpdate(id: number, body: Partial<T>): Promise<boolean>;
  /**
   * @public
   * @async
   * @description Get all Entity<T> records
   * @returns {Promise<T[]>}
   */
  findAll(): Promise<T[]>;
  /**
   * @public 
   * @async
   * @description Delete Entity<T> referenced by id
   * @param {number} id Entity<T> id
   * @returns {Promise<boolean>}
   */
  findOneAndDelete(id: number): Promise<boolean>;
  /**
   * @public 
   * @async
   * @param {any} body Entity<T> Registration DTO
   * @returns {Promise<T>}
   */
  createRecord(body: any): Promise<T>;
}
