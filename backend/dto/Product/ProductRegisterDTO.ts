import {
  IsBoolean,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

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
  category: number;
  company: number;
  constructor(
    title: string,
    content: string,
    original_price: number,
    sale_price: number,
    quantity: number,
    available: boolean,
    category: number,
    company: number
  ) {
    this.title = title;
    this.content = content;
    this.original_price = original_price;
    this.sale_price = sale_price;
    this.quantity = quantity;
    this.available = available;
    this.category = category;
    this.company = company;
  }
  public static fromAny(body: any) {
    return new ProductRegisterDTO(
      body.title,
      body.content,
      body.original_price,
      body.sale_price,
      body.quantity,
      body.available,
      body.category,
      body.company
    );
  }
}
