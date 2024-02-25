import { Column, Entity } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Admin extends User {
  @Column({
    type: "boolean",
  })
  isSup!: boolean;
}
