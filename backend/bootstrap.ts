import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./config/inversify.config";
import cors from "cors";

export class Bootstrap {
  private readonly PORT = process.env.PORT;
  public async run() {
    const server = new InversifyExpressServer(container);
    server.setConfig((app) => {
      app.use(
        cors({
          origin: "*",
        })
      );
    });
    const app = server.build();
    app.listen(this.PORT, () => {
      console.log(`[SERVER] : Running on PORT ${this.PORT}`);
    });
  }
}
