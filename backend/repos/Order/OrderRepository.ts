import { Client } from "../../enteties/Client.entity";
import { Order } from "../../enteties/Order.entity";
import { IRepository } from "../../types/IRepository";

export interface OrderRepository extends IRepository<Order> {
    findByUser(user : Client) : Promise<Order[]>
}