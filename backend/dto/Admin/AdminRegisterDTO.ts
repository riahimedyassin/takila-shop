import { IsBoolean, ValidateNested } from "class-validator";
import { AddressDTO } from "../Address/AddressDTO";
import { UserRegisterDTO } from "../User/UserRegisterDTO";
import { DTOTransformError } from "../../errors/DTOTransformError";

/**
 * @class
 * @description Admin registration default DTO.
 * @extends {UserRegisterDTO}
 */
export class AdminRegisterDTO extends UserRegisterDTO {
  @IsBoolean()
  isSup: boolean;
  @ValidateNested()
  address: AddressDTO;
  constructor(
    name: string,
    lastname: string,
    phone: number,
    email: string,
    password: string,
    isSup: boolean = false,
    address: AddressDTO
  ) {
    super(name, lastname, phone, email, password);
    this.isSup = isSup;
    this.address = address;
  }
  public static fromAny(body: any) {
    if(!body.address) throw new DTOTransformError("Address Could Not be empty")
    const address = new AddressDTO(
      body.address.city,
      body.address.street,
      body.address.country,
      body.address.postcode,
      body.address.region
    );
    return new AdminRegisterDTO(
      body.name,
      body.lastname,
      body.phone,
      body.email,
      body.password,
      body.isSup,
      address
    );
  }
}
