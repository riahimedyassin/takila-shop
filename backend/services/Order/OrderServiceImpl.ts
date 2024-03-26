import { inject, injectable } from "inversify";
import { OrderService } from "./OrderService";
import { OrderRepository } from "../../repos/Order/OrderRepository";
import { TYPES } from "../../constants/TYPES";
import { Order } from "../../enteties/Order.entity";
import { ClientService } from "../Client/ClientService";
import { BaseHttpError } from "../../errors/BaseHttpError";
import { StatusCodes } from "http-status-codes";
import { CreateOrderDTO } from "../../dto/Order/CreateOrderDTO";
import { ProductServie } from "../Product/ProductService";

@injectable()
export class OrderServiceImpl implements OrderService {
  constructor(
    @inject(TYPES.OrderRepository)
    private readonly _orderRepository: OrderRepository,
    @inject(TYPES.ClientService)
    private readonly _clientService: ClientService,
    @inject(TYPES.ProductService)
    private readonly _productService: ProductServie
  ) {}
  public async delete(id: number): Promise<boolean> {
    return await this._orderRepository.findOneAndDelete(id);
  }
  public async findAll(): Promise<Order[]> {
    return await this._orderRepository.findAll();
  }
  public async findByUserID(id: number): Promise<Order[]> {
    const user = await this._clientService.findByID(id);
    if (!user) throw new BaseHttpError("User not found", StatusCodes.NOT_FOUND);
    return await this._orderRepository.findByUser(user);
  }
  public async findOneByID(id: number): Promise<Order | null> {
    return await this._orderRepository.findByID(id);
  }
  public async create(order: CreateOrderDTO): Promise<Order> {
    const product = await this._productService.findOneByID(order.product_id);
    if (!product)
      throw new BaseHttpError("Product not found", StatusCodes.NOT_FOUND);
    const user = await this._clientService.findByID(order.client_id);
    if (!user)
      throw new BaseHttpError("Unauthorized", StatusCodes.UNAUTHORIZED);
    const orderCreated = await this._orderRepository.createRecord(
      new Order(order, product, user)
    );
    return orderCreated;
  }
}
