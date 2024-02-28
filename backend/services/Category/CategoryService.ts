import { CategoryDTO } from "../../dto/Category/CategoryDTO";
import { Category } from "../../enteties/Category.entity";

/**
 * @interface
 * @description Category Service Interface
 */
export interface CategoryService {
  /**
   * @public
   * @async
   * @param {CategoryDTO} category Category base fields
   * @returns {Promise<Category>}
   */
  create(category: CategoryDTO): Promise<Category>;
  /**
   * @public
   * @async
   * @description Return all the categories
   * @returns {CategoryGlobalResponseDTO[]}
   */
  findAll(): Promise<CategoryDTO[]>;
  /**
   * @public
   * @async
   * @param {string} name Category name
   * @returns
   */
  findOneByName(name: string): Promise<Category | null>;
  /**
   *
   * @param {number} id Category ID
   * @param {CategoryDTO} body Fields to update
   * @returns
   */
  update(id: number, body: Partial<CategoryDTO>): Promise<boolean>;
}
