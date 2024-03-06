import { IsString, ValidateNested } from "class-validator";
import { AddressDTO } from "../Address/AddressDTO";
import { UserRegisterDTO } from "../User/UserRegisterDTO";
import { DTOTransformError } from "../../errors/DTOTransformError";

export class ClientRegisterDTO extends UserRegisterDTO {
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
    picture?: string
  ) {
    super(name, lastname, phone, email, password);
    this.address = address;
    this.picture = picture;
  }
  public static fromAny(body: any): ClientRegisterDTO {
    if (!body.address) throw new DTOTransformError("Please provide an address");
    return new ClientRegisterDTO(
      body.name,
      body.lastname,
      body.phone,
      body.email,
      body.password,
      body.address,
      body.picutre || ""
    );
  }
}
