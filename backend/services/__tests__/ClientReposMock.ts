import { Client } from "../../enteties/Client.entity";
import { ClientRepository } from "../../repos/Client/ClientRepository";

export class ClientReposMock implements ClientRepository {
  public async createRecord(body: any): Promise<Client> {
    return new Client();
  }
  public async findAll(): Promise<Client[]> {
    return [];
  }
  public async findByID(id: any): Promise<Client | null> {
    return id != 1 ? null : new Client();
  }
  public async findByRegion(region: string): Promise<Client[]> {
    return [];
  }
  public async findOneAndDelete(id: number): Promise<boolean> {
    return id != 1;
  }
  public async findOneAndUpdate(
    id: number,
    body: Partial<Client>
  ): Promise<boolean> {
    return id != 1;
  }
}
