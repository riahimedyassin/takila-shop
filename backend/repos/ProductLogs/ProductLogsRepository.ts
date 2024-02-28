import { ProductLogs } from "../../enteties/ProductLogs.entity";
import { IRepository } from "../../types/IRepository";


/**
 * @interface
 * @extends {IRepository<ProductLogs>}
 * @description ProductLogs Repository Interface
 */
export interface ProductLogsRepository extends IRepository<ProductLogs> {

}