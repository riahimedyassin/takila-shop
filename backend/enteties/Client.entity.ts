import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { User } from "./User.entity";
import { Rating } from "./Rating.entity";
import { Order } from "./Order.entity";
import { Address } from "./Address.entity";

@Entity()
export class Client extends User {
  @Column({
    type: "varchar",
    nullable: true
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
  @OneToOne(()=> Address,(address) => address.client)
  @JoinColumn()
  address! : Address ; 
}
