
import { ProductLogsRegisterDTO } from "../../dto/ProductLogs/ProductLogsRegisterDTO";
import { ProductLogs } from "../../enteties/ProductLogs.entity";
import { IRepository } from "../../types/IRepository";

/**
 * @interface 
 * @description ProductLogs Service Interface
 * 
 */
export interface ProductLogsService  {
    /**
     * @public 
     * @async 
     * @description Initialize a product log
     * @param {ProductLogsRegisterDTO} body  Product Logs Register DTO , Check {@link ProductLogsRegisterDTO}
     * @returns {Promise<ProductLogs>}
     */
    create(body : ProductLogsRegisterDTO) : Promise<ProductLogs>
}