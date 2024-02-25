import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EPriority } from "../types/EPriority";
import { Product } from "./Product.entity";
import { Address } from "./Address.entity";

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({
    type: "varchar",
  })
  name!: string;
  @Column({
    enum: [0, 1, 2],
  })
  priority!: EPriority;
  @CreateDateColumn()
  created_at!: Date;
  @UpdateDateColumn()
  updated_at!: Date;
  @OneToMany(() => Product, (product) => product.company)
  products! : Product[]; 
  @OneToOne(() => Address,(address) => address.company)
  @JoinColumn({
    name : 'address'
  })
  address! : Address
}
