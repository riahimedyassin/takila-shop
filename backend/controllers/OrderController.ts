import { validateOrReject } from "class-validator";
import { controller, httpPost, requestBody } from "inversify-express-utils";
import { CreateOrderDTO } from "../dto/Order/CreateOrderDTO";
import { OrderService } from "../services/Order/OrderService";
import { inject } from "inversify";
import { TYPES } from "../constants/TYPES";
import { BaseHttpDataResponse } from "../helpers/BaseHttpMessageResponse";
import { StatusCodes } from "http-status-codes";

@controller("/orders")
export class OrderController {
  constructor(
    @inject(TYPES.OrderService)
    private readonly _oderService: OrderService
  ) {}
  @httpPost("/",TYPES.ClientAuthMiddleware)
  public async createOrder(@requestBody() body: any) {
    const orderDTO = CreateOrderDTO.fromAny(body);
    await validateOrReject(orderDTO);
    const created = await this._oderService.create(body);
    return new BaseHttpDataResponse(
      "Order created succesfullu",
      StatusCodes.OK,
      created
    );
  }
}
