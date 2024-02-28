import { CategoryDTO } from "./CategoryDTO";

export class CategoryGlobalResponseDTO extends CategoryDTO  {
  id: number;
  constructor(id: number, title: string, descreption: string) {
    super(title, descreption);
    this.id = id;
  }
}
