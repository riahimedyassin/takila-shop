import { IsNotEmpty } from "class-validator";

export class CreateOrderDTO {
  @IsNotEmpty()
  quantity!: number;
  @IsNotEmpty()
  product_id!: number;
  @IsNotEmpty()
  
  client_id!: number;
  constructor(quantity: number, product_id: number, client_id: number) {
    this.client_id = client_id;
    this.product_id = product_id;
    this.quantity = quantity;
  }
  public static fromAny(body: any): CreateOrderDTO {
    return new this(body.quantity, body.product_id, body.client_id);
  }
}
