import { Column, CreateDateColumn, Entity, OneToMany } from "typeorm";
import { User } from "./User.entity";
import { Rating } from "./Rating.entity";
import { Order } from "./Order.entity";

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
  @OneToMany(()=> Rating,(rating) => rating.clients)
  rating! : Rating[]
  @OneToMany(()=> Order,(order) => order.client)
  orders! : Order[]
}
