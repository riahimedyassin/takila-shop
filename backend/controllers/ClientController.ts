import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  queryParam,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { TYPES } from "../constants/TYPES";
import { ClientRepository } from "../repos/Client/ClientRepository";
import { BaseHttpDataResponse } from "../helpers/BaseHttpMessageResponse";
import { StatusCodes } from "http-status-codes";
import { BaseHttpError } from "../errors/BaseHttpError";
import { ClientService } from "../services/Client/ClientService";
import { validateOrReject } from "class-validator";
import { ClientRegisterDTO } from "../dto/Client/ClientRegisterDTO";
import { ClientUpdateDTO } from "../dto/Client/ClientUpdateDTO";
import { BaseHttpResponse } from "../helpers/BaseHttpResponse";

@controller("/clients")
export class ClientController extends BaseHttpController {
  constructor(
    @inject(TYPES.ClientService) private readonly _clientService: ClientService
  ) {
    super();
  }
  @httpGet("/")
  public async getAllClients(@queryParam("region") region: string) {
    const clients = region
      ? this._clientService.findByRegion(region)
      : this._clientService.findAll();
    return new BaseHttpDataResponse(
      "Clients Retrieved successfully",
      StatusCodes.OK,
      clients
    );
  }
  @httpGet("/:id")
  public async getClient(@requestParam("id") id: number) {
    const client = await this._clientService.findByID(id);
    if (!client)
      return new BaseHttpError("Client not found", StatusCodes.NOT_FOUND);
    return new BaseHttpDataResponse(
      "Client retrieved successfully",
      StatusCodes.OK,
      client
    );
  }
  @httpPost("/")
  public async createClient(@requestBody() body: any) {
    await validateOrReject(ClientRegisterDTO.fromAny(body));
    const client = await this._clientService.createClient(body);
    return new BaseHttpDataResponse(
      "Client created successfully",
      StatusCodes.OK,
      client
    );
  }
  @httpPatch("/:id")
  public async updateClient(
    @requestBody() body: any,
    @requestParam("id") id: number
  ) {
    const changes = ClientUpdateDTO.fromAny(body);
    await validateOrReject(changes, { skipMissingProperties: true });
    if (await this._clientService.update(id, body))
      return new BaseHttpResponse(
        "Updated Successfully",
        StatusCodes.NO_CONTENT
      );
    return new BaseHttpError(
      "Could not update this client",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  @httpDelete("/:id")
  public async delete(@requestParam("id") id: number) {
    if (isNaN(id))
      return new BaseHttpError("Invalid ID", StatusCodes.BAD_REQUEST);
    if (await this._clientService.delete(id))
      return new BaseHttpResponse(
        "Deleted successfully",
        StatusCodes.NO_CONTENT
      );
    return new BaseHttpError(
      "Could not delete this client",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
