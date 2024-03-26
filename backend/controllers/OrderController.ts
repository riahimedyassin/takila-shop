import { controller, httpPost } from "inversify-express-utils";

@controller("/orders")
export class OrderController {
  constructor() {}
  @httpPost("")
  public async createOrder() {}
}
