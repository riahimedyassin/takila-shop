export interface IRepository<T> {
  findByID(id: number): Promise<T>;
  findOneAndUpdate(id: number, body: Partial<T>): Promise<boolean>;
  find(): Promise<T[]>;
  findOneAndDelete(id: number): Promise<boolean>;
  save(body : Partial<T>) : Promise<T> ;
}
