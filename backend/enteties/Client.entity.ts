import { Column, CreateDateColumn, Entity } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Client extends User {
  @Column({
    type: "varchar",
  })
  picutre!: string;
  @Column({
    type: "date",
  })
  birthdate!: Date;
  @CreateDateColumn()
  created_at!: Date;
}
