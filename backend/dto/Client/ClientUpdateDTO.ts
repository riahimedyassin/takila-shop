import { UserRegisterDTO } from "../User/UserRegisterDTO";

export class ClientUpdateDTO extends UserRegisterDTO {
  public static async fromAny(body: any) {
    return new ClientUpdateDTO(
      body.name,
      body.lastname,
      body.phone,
      body.email,
      body.password
    );
  }
}
