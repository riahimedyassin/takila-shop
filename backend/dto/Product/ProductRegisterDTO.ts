import {
  IsBoolean,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";
import { DTOTransformError } from "../../errors/DTOTransformError";
import { CategoryDTO } from "../Category/CategoryDTO";

export class ProductRegisterDTO {
  @MinLength(10)
  @MaxLength(50)
  title: string;
  @MinLength(20)
  @MaxLength(200)
  content: string;
  @Min(1)
  original_price: number;
  @Min(1)
  sale_price: number;
  @Min(0)
  quantity: number;
  @IsBoolean()
  available: boolean;
  @ValidateNested()
  category: CategoryDTO;
  constructor(
    title: string,
    content: string,
    original_price: number,
    sale_price: number,
    quantity: number,
    available: boolean,
    category: CategoryDTO
  ) {
    this.title = title;
    this.content = content;
    this.original_price = original_price;
    this.sale_price = sale_price;
    this.quantity = quantity;
    this.available = available;
    this.category = category;
  }
  public static fromAny(body: any) {
    if (!body.category)
      throw new DTOTransformError("Please provide a category");
    const category = new CategoryDTO(body.category, body.descreption);
    return new ProductRegisterDTO(
      body.title,
      body.content,
      body.original_price,
      body.sale_price,
      body.quantity,
      body.available,
      category
    );
  }
}
