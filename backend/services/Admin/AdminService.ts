import { AdminGlobalResponse } from "../../dto/Admin/AdminGlobalResponse";
import { AdminRegisterDTO } from "../../dto/Admin/AdminRegisterDTO";
import { AdminUpdateDTO } from "../../dto/Admin/AdminUpdateDTO";
import { Admin } from "../../enteties/Admin.entity";
import { BaseHttpError } from "../../errors/BaseHttpError";
import { EPermission } from "../../types/EPermission";

/**
 * @interface
 * @description Methods that should be implemented in the Admin Service.
 */
export interface AdminService {
  /**
   * @public
   * @async
   * @description Create a single admin
   * @param {AdminRegisterDTO} body Base admin register DTO.
   * @returns {Promise<Admin>}
   * @throws {BaseHttpError}
   */
  create(body: AdminRegisterDTO): Promise<Admin>;
  /**
   * @public 
   * @async
   * @description Delete a single admin
   * @param {number} id Admin id
   * @returns {Promise<boolean>} 
   */
  delete(id: number): Promise<boolean>;
  /**
   * @public 
   * @async
   * @description Update a single admin partially
   * @param {number} id Admin id
   * @param {Partial<AdminUpdateDTO>} body Fields to update
   * @returns {Promise<boolean>} 
   */
  update(id: number, body: Partial<AdminUpdateDTO>): Promise<boolean>;
  /**
   * @public 
   * @async
   * @description Update a single admin permissions
   * @param {number} id Admin id 
   * @param {EPermission} permission Permissions : sup or default
   * @returns {Promise<boolean>}
   */
  updatePermission(id: number, permission: EPermission): Promise<boolean>;
  /**
   * @public 
   * @async
   * @description Returns all the admins
   * @returns {Promise<AdminGlobalResponse[]>}
   */
  findAll(): Promise<AdminGlobalResponse[]>;
  /**
   * @public 
   * @async 
   * @description Return an admin referenced by his id
   * @param {number} id 
   * @returns {Promise<Admin | null>}
   */
  findOneByID(id: number): Promise<Admin | null>;
}
