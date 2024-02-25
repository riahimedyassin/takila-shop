import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Client } from "./Client.entity";
import { Product } from "./Product.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({
    type: "boolean",
  })
  confirmed!: boolean;
  @Column({
    type: "boolean",
  })
  @Column({
    type: "int",
    default: 1,
  })
  quantity!: number;
  delivered!: boolean;
  @CreateDateColumn()
  created_at!: Date;
  @UpdateDateColumn()
  updated_at!: Date;
  @ManyToOne(()=> Client,(client) => client.orders)
  client! : Client; 
  @ManyToOne(()=> Product,(product) => product.orders)
  product! : Product
}
