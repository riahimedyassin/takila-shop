import { UserRegisterDTO } from "../User/UserRegisterDTO";


/**
 * @class
 * @description Admin registration default DTO.
 * @extends {UserRegisterDTO}
 */
export class AdminRegisterDTO extends UserRegisterDTO {
  isSup: boolean;
  constructor(
    name: string,
    lastname: string,
    phone: number,
    email: string,
    password: string,
    isSup: boolean = false
  ) {
    super(name, lastname, phone, email, password);
    this.isSup = isSup;
  }
}
