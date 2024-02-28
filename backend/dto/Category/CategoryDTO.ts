import { MaxLength, MinLength } from "class-validator";

export class CategoryDTO {
  @MinLength(1)
  @MaxLength(20)
  title: string;
  @MinLength(5)
  @MaxLength(50)
  descreption: string;
  constructor(title: string, descreption: string) {
    this.title = title;
    this.descreption = descreption;
  }
}
