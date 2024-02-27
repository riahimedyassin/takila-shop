
import { ProductLogsRegisterDTO } from "../../dto/ProductLogs/ProductLogsRegisterDTO";
import { ProductLogs } from "../../enteties/ProductLogs.entity";

export interface ProductLogsService {
    save(body : ProductLogsRegisterDTO) : Promise<ProductLogs>
}