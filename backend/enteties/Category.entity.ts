import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({
    type: "varchar",
  })
  title!: string;
  @Column({
    type: "varchar",
  })
  descreption!: string;
  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}
