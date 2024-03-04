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
import { AdminService } from '../services/Admin/AdminService'
import { AdminServiceImpl } from '../services/Admin/AdminServiceImpl'
import { CategoryRepository } from '../repos/Category/CategoryRepository'
import { CategoryRepositoryImpl } from '../repos/Category/CategoryRepositoryImpl'
import { CategoryServiceImpl } from '../services/Category/CategoryServiceImpl'
import { CategoryService } from '../services/Category/CategoryService'
import { CompanyService } from '../services/Company/CompanyService'
import { CompanyServiceImpl } from '../services/Company/CompanyServiceImpl'
import { CompanyRepositoryImpl } from '../repos/Company/CompanyRepositoryImpl'
import { CompanyRepository } from '../repos/Company/CompanyRepository'
import { TokenManager } from '../helpers/Token/TokenManager'
import { TokenManagerImpl } from '../helpers/Token/TokenManagerImpl'
import { HashingManager } from '../helpers/Hashing/HashingManager'
import { HashingManagerImpl } from '../helpers/Hashing/HashingManagerImpl'
import { AnyAuthMiddleware } from '../middlewares/AnyAuthMiddleware'
import { AdminAuthMiddleware } from '../middlewares/AdminAuthMiddleware'
import { RatingRepository } from '../repos/Rating/RatingRepository'
import { RatingRepositoryImpl } from '../repos/Rating/RatingRepositoryImpl'
import { RatingServiceImpl } from '../services/Rating/RatingServiceImpl'
import { RatingService } from '../services/Rating/RatingService'


const container = new Container()
container.bind<DatabaseService>(TYPES.DatabaseService).to(DatabaseServiceImpl).inSingletonScope()
container.bind<AddressService>(TYPES.AddressService).to(AddressServiceImpl).inSingletonScope()
container.bind<ProductServie>(TYPES.ProductService).to(ProductServiceImpl).inSingletonScope()
container.bind<ProductRepository>(TYPES.ProductRepository).to(ProductRepositoryImpl).inSingletonScope()
container.bind<ProductLogsService>(TYPES.ProductLogsService).to(ProductLogsServiceImpl).inSingletonScope()
container.bind<ProductLogsRepository>(TYPES.ProductLogsRepository).to(ProductLogsRepositoryImpl).inSingletonScope()
container.bind<AdminRepository>(TYPES.AdminRepository).to(AdminRepositoryImpl).inSingletonScope()
container.bind<AddressRepository>(TYPES.AddressRepository).to(AddressRepositoryImpl).inSingletonScope()
container.bind<AdminService>(TYPES.AdminService).to(AdminServiceImpl).inSingletonScope()
container.bind<CategoryRepository>(TYPES.CategoryRepository).to(CategoryRepositoryImpl).inSingletonScope()
container.bind<CategoryService>(TYPES.CategoryService).to(CategoryServiceImpl).inSingletonScope()
container.bind<CompanyService>(TYPES.CompanyService).to(CompanyServiceImpl).inSingletonScope()
container.bind<CompanyRepository>(TYPES.CompanyRepository).to(CompanyRepositoryImpl).inSingletonScope()
container.bind<TokenManager>(TYPES.TokenManager).to(TokenManagerImpl).inSingletonScope()
container.bind<HashingManager>(TYPES.HashingManager).to(HashingManagerImpl).inSingletonScope()
container.bind<RatingRepository>(TYPES.RatingRepository).to(RatingRepositoryImpl).inSingletonScope()
container.bind<RatingService>(TYPES.RatingService).to(RatingServiceImpl).inSingletonScope()
container.bind(TYPES.AnyAuthMiddleware).to(AnyAuthMiddleware)
container.bind(TYPES.AdminAuthMiddleware).to(AdminAuthMiddleware)

export {container}