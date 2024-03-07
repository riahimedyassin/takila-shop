import { Product } from "../../enteties/Product.entity";
import { ProductUpdateDTO } from "./ProductUpdateDTO";

export class ProductGlobalResponse extends ProductUpdateDTO {
  id: number;
  constructor(
    id: number,
    title: string,
    content: string,
    original_price: number,
    sale_price: number,
    quantity: number,
    available: boolean
  ) {
    super(title, content, original_price, sale_price, quantity, available);
    this.id = id;
  }
  /**
   * @public
   * @static
   * @description Convert a Product entity into a ProductGlobalResponse DTO
   * @param {Product} p Product Entity
   * @returns {ProductGlobalResponse}
   */
  public static fromProduct(p: Product): ProductGlobalResponse {
    return new ProductGlobalResponse(
      p.id,
      p.title,
      p.content,
      p.original_price,
      p.sale_price,
      p.quantity,
      p.available
    );
  }
}
