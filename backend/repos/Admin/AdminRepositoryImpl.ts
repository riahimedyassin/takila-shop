import { inject, injectable } from "inversify";
import { AdminRepository } from "./AdminRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/DB/DatabaseService";
import { Admin } from "../../enteties/Admin.entity";
import { BaseRepository } from "../BaseRepository";

/**
 * @class 
 * @extends {BaseRepository<Admin>}
 * @implements {AdminRepository}
 * @classdesc Admin Repository Implementation
 */
@injectable()
export class AdminRepositoryImpl extends BaseRepository<Admin> implements AdminRepository {
    constructor(
        @inject(TYPES.DatabaseService) dbService: DatabaseService
    ){
        super(Admin)
    }
}