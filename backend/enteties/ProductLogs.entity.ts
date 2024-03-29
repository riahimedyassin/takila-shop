import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product.entity";
import { Admin } from "./Admin.entity";

@Entity()
export class ProductLogs {
  @PrimaryGeneratedColumn()
  id!: number ; 
  @UpdateDateColumn()
  updated_at!: Date;
  @ManyToOne(() => Product, (product) => product.prod_log, { eager: true })
  @JoinColumn({
    name: "product",
  })
  product_id!: Product;
  @ManyToOne(() => Admin, (admin) => admin.prod_log, { eager: true })
  admin!: Admin;
}
