import { inject, injectable } from "inversify";
import { AdminRepository } from "./AdminRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/DB/DatabaseService";
import { Admin } from "../../enteties/Admin.entity";
import { BaseRepository } from "../BaseRepository";


@injectable()
export class AdminRepositoryImpl extends BaseRepository<Admin> implements AdminRepository {
    constructor(
        @inject(TYPES.DatabaseService) private readonly _dbService : DatabaseService
    ){
        super(Admin)
    }
}