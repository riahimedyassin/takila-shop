import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./config/inversify.config";
import cors from "cors";
import { inject } from "inversify";
import { TYPES } from "./constants/TYPES";
import { DatabaseService } from "./services/DB/DatabaseService";
import express, { urlencoded } from 'express'
import { ErrorHandler } from "./errors/ErrorHandler";

/**
 * @abstract
 * @class
 * @description Bootstraping the application
 */
export abstract class Bootstrap {
  protected constructor(
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService
  ) {}
  private readonly PORT = process.env.PORT || 3000;
  public async run() {
    await this._dbService.connectToDB();
    const server = new InversifyExpressServer(container);
    server.setConfig((app) => {
      app.use(express.json());
      app.use(urlencoded({ extended: true }));
      app.use(
        cors({
          origin: "*",
        })
      );
    });
    server.setErrorConfig((app) => {
      app.use(new ErrorHandler().handler)
    })
    const app = server.build();
    app.listen(this.PORT, () => {
      console.log(`[SERVER] : Running on PORT ${this.PORT}`);
    });
  }
}
