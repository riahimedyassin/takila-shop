import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, httpPatch, queryParam, requestBody, requestParam } from "inversify-express-utils";
import { TYPES } from "../constants/TYPES";
import { ClientRepository } from "../repos/Client/ClientRepository";
import { BaseHttpDataResponse } from "../helpers/BaseHttpMessageResponse";
import { StatusCodes } from "http-status-codes";
import { BaseHttpError } from "../errors/BaseHttpError";

@controller('/api/takila/v1/clients')
export class ClientController extends BaseHttpController {
    constructor(
        @inject(TYPES.ClientRepository) private readonly _clientRepository : ClientRepository
    ) {
        super()
    }
    @httpGet('/')
    public async getAllClients(
        @queryParam('region') region : string 
    ) {
        const clients = region ? this._clientRepository.findByRegion(region) : this._clientRepository.findAll();
        return new BaseHttpDataResponse("Clients Retrieved successfully",StatusCodes.OK,clients);  
    }
    @httpGet('/:id')
    public async getClient(
        @requestParam("id") id : number
    ){
        const client = await this._clientRepository.findByID(id); 
        if(!client) throw new BaseHttpError("Client not found",StatusCodes.NOT_FOUND); 
        return new BaseHttpDataResponse("Client retrieved successfully",StatusCodes.OK,client); 
    }
    @httpPatch("/:id")
    public async updateClient(
        @requestParam("id") id : number , 
        @requestBody() body : any 
    ) {
        
    }
} 