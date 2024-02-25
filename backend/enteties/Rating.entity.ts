import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product.entity";
import { Client } from "./Client.entity";

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({
    type: "varchar",
  })
  content!: string;
  @Column({
    type: "int",
  })
  score!: number;
  @ManyToOne(()=>Product,(product) => product.ratings )
  product! : Product
  @ManyToOne(()=> Client,(client) => client.rating )
  clients! : Client[]
}
