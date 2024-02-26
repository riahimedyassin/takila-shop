import {Container} from 'inversify'
import { ProductServie } from '../services/Product/ProductService'
import { ProductServiceImpl } from '../services/Product/ProductServiceImpl'
import { TYPES } from '../constants/TYPES'
import { ProductRepositoryImpl } from '../repos/Product/ProductRepositoryImpl'
import { DatabaseService } from '../services/DB/DatabaseService'
import { DatabaseServiceImpl } from '../services/DB/DatabaseServiceImpl'


const container = new Container()
container.bind<DatabaseService>(TYPES.DatabaseService).to(DatabaseServiceImpl).inSingletonScope()
container.bind<ProductServie>(TYPES.ProductService).to(ProductServiceImpl).inSingletonScope()
container.bind<ProductServie>(TYPES.ProductRepository).to(ProductRepositoryImpl).inSingletonScope()


export {container}