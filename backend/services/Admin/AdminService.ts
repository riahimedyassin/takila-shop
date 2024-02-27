import { AdminRegisterDTO } from "../../dto/Admin/AdminRegisterDTO";
import { Admin } from "../../enteties/Admin.entity";
import { EPermission } from "../../types/EPermission";

/**
 * @interface 
 * @description Methods that should be implemented in the Admin Service.
 */
export interface AdminService {
    create(body : AdminRegisterDTO) : Promise<Admin>
    delete(id : number) : Promise<boolean> ; 
    update(id : number ) : Promise<boolean> ; 
    updatePermission(id:number , permission : EPermission) : Promise<boolean>
}