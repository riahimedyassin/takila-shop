import { inject, injectable } from "inversify";
import { OrderService } from "./OrderService";
import { OrderRepository } from "../../repos/Order/OrderRepository";
import { TYPES } from "../../constants/TYPES";
import { Order } from "../../enteties/Order.entity";
import { ClientService } from "../Client/ClientService";
import { BaseHttpError } from "../../errors/BaseHttpError";
import { StatusCodes } from "http-status-codes";

@injectable()
export class OrderServiceImpl implements OrderService {
  constructor(
    @inject(TYPES.OrderRepository)
    private readonly _orderRepository: OrderRepository,
    @inject(TYPES.ClientService)
    private readonly _clientService: ClientService
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
}
