import {Container} from 'inversify'
import { ProductServie } from '../services/Product/ProductService'
import { ProductServiceImpl } from '../services/Product/ProductServiceImpl'
import { TYPES } from '../constants/TYPES'
import { ProductRepositoryImpl } from '../repos/Product/ProductRepositoryImpl'
import { DatabaseService } from '../services/DB/DatabaseService'
import { DatabaseServiceImpl } from '../services/DB/DatabaseServiceImpl'
import { ProductLogsService } from '../services/ProductLogs/ProductLogsService'
import { ProductLogsServiceImpl } from '../services/ProductLogs/ProductLogsServiceImpl'
import { ProductLogsRepository } from '../repos/ProductLogs/ProductLogsRepository'
import { ProductLogsRepositoryImpl } from '../repos/ProductLogs/ProductLogsRepositoryImpl'
import { ProductRepository } from '../repos/Product/ProductRepository'
import { AdminRepository } from '../repos/Admin/AdminRepository'
import { AdminRepositoryImpl } from '../repos/Admin/AdminRepositoryImpl'
import { AddressRepository } from '../repos/Address/AddressRepositroy'
import { AddressRepositoryImpl } from '../repos/Address/AddressRepositoryImpl'
import { AddressService } from '../services/Address/AddressService'
import { AddressServiceImpl } from '../services/Address/AddressServiceImpl'


const container = new Container()
container.bind<DatabaseService>(TYPES.DatabaseService).to(DatabaseServiceImpl).inSingletonScope()
container.bind<ProductServie>(TYPES.ProductService).to(ProductServiceImpl).inSingletonScope()
container.bind<ProductRepository>(TYPES.ProductRepository).to(ProductRepositoryImpl).inSingletonScope()
container.bind<ProductLogsService>(TYPES.ProductLogsService).to(ProductLogsServiceImpl).inSingletonScope()
container.bind<ProductLogsRepository>(TYPES.ProductRepository).to(ProductLogsRepositoryImpl).inSingletonScope()
container.bind<AdminRepository>(TYPES.AdminRepository).to(AdminRepositoryImpl).inSingletonScope()
container.bind<AddressRepository>(TYPES.AddressRepository).to(AddressRepositoryImpl).inSingletonScope()
container.bind<AddressService>(TYPES.AddressService).to(AddressServiceImpl).inSingletonScope()


export {container}