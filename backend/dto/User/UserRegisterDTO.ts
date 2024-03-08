import { IsEmail, Length, MaxLength, MinLength } from "class-validator";
import { AdminUpdateDTO } from "../Admin/AdminUpdateDTO";

/**
 * @class
 * @abstract
 * @description Default User register DTO used in Admin and Client register
 */
export abstract class UserRegisterDTO {
  @MinLength(1)
  @MaxLength(20)
  name?: string;
  @MinLength(1)
  @MaxLength(20)
  lastname?: string;
  @Length(8)
  phone?: number;
  @IsEmail()
  email?: string;
  @MinLength(6)
  @MaxLength(20)
  password?: string;
  constructor(
    name?: string,
    lastname?: string,
    phone?: number,
    email?: string,
    password?: string
  ) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }
  
}
