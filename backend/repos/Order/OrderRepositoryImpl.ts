import { injectable } from "inversify";
import { Order } from "../../enteties/Order.entity";
import { BaseRepository } from "../BaseRepository";
import { OrderRepository } from "./OrderRepository";
import { Client } from "../../enteties/Client.entity";

@injectable()
export class OrderRepositoryImpl extends BaseRepository<Order> implements OrderRepository {
    public async findByUser(user : Client) {
        return this.findBy({client : user})
    }
}