import { inject } from "inversify";
import { AdminService } from "./AdminService";
import { TYPES } from "../../constants/TYPES";
import { AdminRepository } from "../../repos/Admin/AdminRepository";
import { Admin } from "../../enteties/Admin.entity";
import { AdminRegisterDTO } from "../../dto/Admin/AdminRegisterDTO";

/**
 * @class
 * @description Admin service implementation 
 * @implements {AdminService}
 */
export class AdminServiceImpl implements AdminService {
    constructor(
        @inject(TYPES.AdminRepository) private readonly _adminRepository : AdminRepository
    ){}
    public async create(body : AdminRegisterDTO): Promise<Admin> {
        const admin = await this._adminRepository.save(body); 
        return admin ; 
    }
    public async delete(id: number): Promise<boolean> {
        
    }
}