import { inject, injectable } from "inversify";
import { Category } from "../../enteties/Category.entity";
import { BaseRepository } from "../BaseRepository";
import { CategoryRepository } from "./CategoryRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/DB/DatabaseService";

/**
 * @class 
 * @extends {BaseRepository<Category>}
 * @implements {CategoryRepository}
 * @classdesc Category Repository Implementation
 */
@injectable()
export class CategoryRepositoryImpl extends BaseRepository<Category> implements CategoryRepository {
    constructor(
        @inject(TYPES.DatabaseService) dbService : DatabaseService
    ) {
        super(Category); 
    }
    public async findOneByName(name : string) : Promise<Category | null> {
        return await this.findOneBy({title:name}); 
    }
}