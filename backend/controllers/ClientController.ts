import { inject } from "inversify";
import { BaseHttpController, controller, httpGet, httpPatch, httpPost, queryParam, requestBody, requestParam } from "inversify-express-utils";
import { TYPES } from "../constants/TYPES";
import { ClientRepository } from "../repos/Client/ClientRepository";
import { BaseHttpDataResponse } from "../helpers/BaseHttpMessageResponse";
import { StatusCodes } from "http-status-codes";
import { BaseHttpError } from "../errors/BaseHttpError";
import { ClientService } from "../services/Client/ClientService";
import { validateOrReject } from "class-validator";
import { ClientRegisterDTO } from "../dto/Client/ClientRegisterDTO";

@controller('/api/takila/v1/clients')
export class ClientController extends BaseHttpController {
    constructor(
        @inject(TYPES.ClientService) private readonly _clientService : ClientService
    ) {
        super()
    }
    @httpGet('/')
    public async getAllClients(
        @queryParam('region') region : string 
    ) {
        const clients = region ? this._clientService.findByRegion(region) : this._clientService.findAll();
        return new BaseHttpDataResponse("Clients Retrieved successfully",StatusCodes.OK,clients);  
    }
    @httpGet('/:id')
    public async getClient(
        @requestParam("id") id : number
    ){
        const client = await this._clientService.findByID(id); 
        if(!client) return new BaseHttpError("Client not found",StatusCodes.NOT_FOUND); 
        return new BaseHttpDataResponse("Client retrieved successfully",StatusCodes.OK,client); 
    }
    @httpPost("/")
    public async createClient(
        @requestBody() body : any 
    ) { 
        await validateOrReject(ClientRegisterDTO.fromAny(body))
        const client = await this._clientService.createClient(body) ; 
        return new BaseHttpDataResponse("Client created successfully",StatusCodes.OK,client)
    }
    
} 