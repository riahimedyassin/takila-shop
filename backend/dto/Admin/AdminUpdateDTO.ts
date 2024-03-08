import { UserRegisterDTO } from "../User/UserRegisterDTO";

export class AdminUpdateDTO extends UserRegisterDTO {
  public static fromAny(body: any) {
    return new AdminUpdateDTO(
      body.name,
      body.lastname,
      body.phone,
      body.email,
      body.password
    );
  }
}
