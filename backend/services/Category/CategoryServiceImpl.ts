import { inject, injectable } from "inversify";
import { CategoryService } from "./CategoryService";
import { TYPES } from "../../constants/TYPES";
import { CategoryRepository } from "../../repos/Category/CategoryRepository";
import { CategoryGlobalResponseDTO } from "../../dto/Category/CategoryGlobalResponseDTO";
import { Category } from "../../enteties/Category.entity";
import { CategoryDTO } from "../../dto/Category/CategoryDTO";


/**
 * @class
 * @implements {CategoryService}
 * @description Category Service Implemenation
 */
@injectable()
export class CategoryServiceImpl implements CategoryService {
  constructor(
    @inject(TYPES.CategoryRepository)
    private readonly _categoryRepository: CategoryRepository
  ) {}
  public async create(category: CategoryDTO): Promise<Category> {
    const categ = await this._categoryRepository.createRecord(category);
    return categ;
  }
  public async findAll(): Promise<CategoryGlobalResponseDTO[]> {
    return (await this._categoryRepository.findAll()).map(
      (category) => new CategoryGlobalResponseDTO(category.id,category.title, category.descreption)
    );
  }
  
  public async findOneByName(name: string): Promise<Category | null> {
        return await this._categoryRepository.findOneByName(name); 
  }
  public async update(id: number, body: Partial<CategoryDTO>): Promise<boolean> {
    return await this._categoryRepository.findOneAndUpdate(id,body); 
  }
}
