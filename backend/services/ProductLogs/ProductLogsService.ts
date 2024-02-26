import { ProductLogs } from "../../enteties/ProductLogs.entity";

export interface ProductLogsService {
    save(body : Partial<ProductLogs>) : Promise<ProductLogs>
}