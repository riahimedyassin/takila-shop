import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, httpPost, requestBody, requestParam } from "inversify-express-utils";
import { TYPES } from "../constants/TYPES";
import { AdminService } from "../services/Admin/AdminService";
import { AdminRegisterDTO } from "../dto/Admin/AdminRegisterDTO";
import { bodyValidation } from "../helpers/BodyValidation";
import { validate } from "class-validator";


@controller('/api/v1/takila/admin')
export class AdminController extends BaseHttpController {
    constructor(
        @inject(TYPES.AdminService) private readonly _adminService : AdminService
    ){
        super()
    }
    @httpPost('/')
    public async create(
        @requestBody() body : AdminRegisterDTO
    ) { 
        bodyValidation(await validate(body)); 
        const admin = await this._adminService.create(body); 
        return admin;
    }
    @httpGet('/')
    public async findAll() {
        const admins = await this._adminService.findAll();
        return admins 
    }
    @httpGet('/:id')
    public async findOne(
        @requestParam('id') id: number
    ) {
        const admin = await this._adminService.findOneByID(id); 
        return admin ; 
    }
}