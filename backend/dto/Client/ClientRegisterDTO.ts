import { IsString, ValidateNested } from "class-validator";
import { AddressDTO } from "../Address/AddressDTO";
import { UserRegisterDTO } from "../User/UserRegisterDTO";

export class ClientRegisterDTO extends UserRegisterDTO {
  @IsString()
  region: string;
  @ValidateNested()
  address: AddressDTO;
  picture?: string;
  constructor(
    name: string,
    lastname: string,
    phone: number,
    email: string,
    password: string,
    address: AddressDTO,
    region: string,
    picture?: string
  ) {
    super(name, lastname, phone, email, password);
    this.address = address;
    this.region = region;
    this.picture = picture;
  }
}
