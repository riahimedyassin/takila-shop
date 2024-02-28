
import { ProductLogsRegisterDTO } from "../../dto/ProductLogs/ProductLogsRegisterDTO";
import { ProductLogs } from "../../enteties/ProductLogs.entity";

export interface ProductLogsService {
    /**
     * @public 
     * @async 
     * @description Initialize a product log
     * @param {ProductLogsRegisterDTO} body Product Logs Register DTO
     * @returns {Promise<ProductLogs>}
     */
    create(body : ProductLogsRegisterDTO) : Promise<ProductLogs>
}