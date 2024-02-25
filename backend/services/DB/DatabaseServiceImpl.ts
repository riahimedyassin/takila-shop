import { DataSource } from "typeorm";
import { DatabaseService } from "./DatabaseService";
import { injectable } from "inversify";

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
      entities: [],
    });
    this.db = AppDataSource;
    AppDataSource.initialize().then((connection) => {
      this.manager = connection;
    });
  }
  public connection() {
    let connection;
    this.db.initialize().then((cnx) => (connection = cnx));
    return connection;
  }
  public async check() {}
  public async connectToDB(): Promise<void> {
    this.db.initialize().then((cnx) => (this.db = cnx));
  }
}
