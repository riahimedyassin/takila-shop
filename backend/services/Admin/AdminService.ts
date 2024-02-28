import { AdminGlobalResponse } from "../../dto/Admin/AdminGlobalResponse";
import { AdminRegisterDTO } from "../../dto/Admin/AdminRegisterDTO";
import { AdminUpdateDTO } from "../../dto/Admin/AdminUpdateDTO";
import { Admin } from "../../enteties/Admin.entity";
import { EPermission } from "../../types/EPermission";

/**
 * @interface
 * @description Methods that should be implemented in the Admin Service.
 */
export interface AdminService {
  /**
   * @public
   * @async
   * @param {AdminRegisterDTO} body Base admin register DTO.
   * @returns {Promise<Admin>}
   */
  create(body: AdminRegisterDTO): Promise<Admin>;
  delete(id: number): Promise<boolean>;
  update(id: number, body: Partial<AdminUpdateDTO>): Promise<boolean>;
  updatePermission(id: number, permission: EPermission): Promise<boolean>;
  findAll(): Promise<AdminGlobalResponse[]>;
  findOneByID(id: number): Promise<Admin | null>;
}
