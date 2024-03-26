import { Order } from "../../enteties/Order.entity";

/**
 * @class
 * @classdesc Order Service 
 */
export interface OrderService  {
    findAll() : Promise<Order[]> 
    findOneByID(id : number) : Promise<Order | null>
    delete(id : number) : Promise<boolean>
    findByUserID(id : number) : Promise<Order[]>
    
}