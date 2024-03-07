import { IsEnum, MinLength } from "class-validator";
import { AddressDTO } from "../Address/AddressDTO";
import { EPriority } from "../../types/EPriority";
import { DTOTransformError } from "../../errors/DTOTransformError";

export class CompanyRegisterDTO {
  @MinLength(1)
  name: string;
  @IsEnum(EPriority)
  priority: string;
  address: AddressDTO;
  constructor(name: string, priority: string, address: AddressDTO) {
    this.address = address;
    this.name = name;
    this.priority = priority;
  }
  public static fromAny(body: any): CompanyRegisterDTO {
    if(!body.address) throw new DTOTransformError("Please provide an address")
    const address = AddressDTO.fromAny(body.address);
    return new CompanyRegisterDTO(body.name, body.priority,address);
  }
}
