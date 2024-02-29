import { IsEnum, MinLength } from "class-validator";
import { AddressDTO } from "../Address/AddressDTO";
import { EPriority } from "../../types/EPriority";

export class CompanyRegisterDTO {
    @MinLength(1)
    name : string ; 
    @IsEnum(EPriority)
    priority : string ; 
    address : AddressDTO
    constructor(
        name : string , priority : string , address : AddressDTO
    ) {
        this.address=address; 
        this.name=name;
        this.priority=priority; 
    }
}