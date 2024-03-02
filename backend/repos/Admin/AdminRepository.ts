import { Admin } from "../../enteties/Admin.entity";
import { IRepository } from "../../types/IRepository";


/**
 * @interface
 * @description Admin Repository Interface 
 * @extends {IRepository<Admin>}
 */
export interface AdminRepository extends IRepository<Admin> {
    findOneByEmail(email :string ) : Promise<Admin|null>
}