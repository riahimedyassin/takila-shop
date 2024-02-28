import { DataSource } from "typeorm";
import { DatabaseService } from "./DatabaseService";
import { injectable } from "inversify";
import { Product } from "../../enteties/Product.entity";
import { Admin } from "../../enteties/Admin.entity";
import { Client } from "../../enteties/Client.entity";
import { Address } from "../../enteties/Address.entity";
import { Company } from "../../enteties/Company.entity";
import { Order } from "../../enteties/Order.entity";
import { Rating } from "../../enteties/Rating.entity";
import { ProductLogs } from "../../enteties/ProductLogs.entity";
import { Category } from "../../enteties/Category.entity";

@injectable()
export class DatabaseServiceImpl implements DatabaseService {
  public db!: DataSource;
  public manager!: DataSource;
  constructor() {
    const { DB_HOST, DB_USERNAME, DB_DATABASE, DB_PASSWORD, DB_PORT } =
      process.env;
    const AppDataSource = new DataSource({
      type: "postgres",
      host: DB_HOST,
      port: Number(DB_PORT),
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      synchronize: true,
      entities: [
        Admin,
        Client,
        Address,
        Company,
        Order,
        Rating,
        Product,
        ProductLogs,
        Category,
      ],
    });
    this.db = AppDataSource;
    AppDataSource.initialize().then((connection) => {
      this.manager = connection;
    });
  }
  public async check() {}
  public async connectToDB(): Promise<void> {
    this.db.initialize().then((cnx) => (this.db = cnx));
  }
}
