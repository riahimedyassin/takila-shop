import { CreateOrderDTO } from "../../dto/Order/CreateOrderDTO";
import { Order } from "../../enteties/Order.entity";

/**
 * @class
 * @classdesc Order Service
 */
export interface OrderService {
  /**
   * @public
   * @async
   * @description Get all Orders
   * @returns {Promise<Order[]>}
   */
  findAll(): Promise<Order[]>;
  /**
   * @public
   * @async
   * @description Find Order By ID
   * @param {number} id
   * @returns {Promise<Order | null>}
   */
  findOneByID(id: number): Promise<Order | null>;
  /**
   * @public
   * @async
   * @description Delete and Order given its ID
   * @param {number} id
   * @returns {Promise<boolean>}
   */
  delete(id: number): Promise<boolean>;
  /**
   * @public
   * @async
   * @description Find Order By the User ID
   * @param {number} id
   * @returns {Promise<Order[]>}
   */
  findByUserID(id: number): Promise<Order[]>;
  /**
   * @public
   * @async
   * @description Create an Order from a {@link CreateOrderDTO}
   * @param {CreateOrderDTO} order
   * @returns {Promise<Order>}
   */
  create(order: CreateOrderDTO): Promise<Order>;
}
