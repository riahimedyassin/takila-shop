/**
 * @constant types for inversify
 */
export const TYPES = {
  ProductService: Symbol.for("ProductService"),
  ProductRepository: Symbol.for("ProductRepository"),
  DatabaseService: Symbol.for("DatabaseService"),
  ProductLogsService: Symbol.for("ProductLogsService"),
  ProductLogsRepository: Symbol.for("ProductLogsRepository"),
  AdminRepository: Symbol.for("AdminRepository"),
  AddressRepository: Symbol.for("AddressRepository"),
  AddressService: Symbol.for("AddressService"),
  AdminService: Symbol.for("AdminService"),
  CategoryRepository : Symbol.for('CategoryRepository'),
  CategoryService : Symbol.for('CategoryService'), 
  CompanyService : Symbol.for("CompanyService"), 
  CompanyRepository : Symbol.for("CompanyRepository"), 
  TokenManager : Symbol.for("TokenManager"), 
  HashingManager : Symbol.for("HashingManager"), 
  AnyAuthMiddleware : Symbol.for("AnyAuthMiddleware"),
  AdminAuthMiddleware : Symbol.for("AdminAuthMiddleware"), 
  RatingService : Symbol.for("RatingService"),
  RatingRepository : Symbol.for("RatingRepository"),
};
