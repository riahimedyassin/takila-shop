import { AddressDTO } from "../Address/AddressDTO";
import { UserRegisterDTO } from "../User/UserRegisterDTO";


/**
 * @class
 * @description Admin registration default DTO.
 * @extends {UserRegisterDTO}
 */
export class AdminRegisterDTO extends UserRegisterDTO {
  isSup: boolean;
  address : AddressDTO
  constructor(
    name: string,
    lastname: string,
    phone: number,
    email: string,
    password: string,
    isSup: boolean = false, 
    address : AddressDTO
  ) {
    super(name, lastname, phone, email, password);
    this.isSup = isSup;
    this.address=address ; 
  }
}
