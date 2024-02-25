import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductLogs } from "./ProductLogs.entity";
import { Category } from "./Category.entity";
import { Company } from "./Company.entity";
import { Rating } from "./Rating.entity";
import { Order } from "./Order.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({
    type: "varchar",
  })
  title!: string;
  @Column({
    type: "varchar",
  })
  content!: string;
  @Column({
    type: "float",
  })
  original_price!: number;
  @Column({
    type: "float",
  })
  sale_price!: number;
  @Column({
    type: "int",
  })
  quantity!: number;
  @Column({
    type: "boolean",
  })
  available!: boolean;
  @CreateDateColumn()
  created_at!: Date;
  @OneToMany(() => ProductLogs, (prod_log) => prod_log.product_id)
  prod_log!: ProductLogs[];
  @ManyToOne(() => Category, (category) => category.products)
  category!: Category;
  @ManyToOne(() => Company, (company) => company.products)
  company!: Company;
  @OneToMany(() => Rating, (rating) => rating.product)
  ratings!: Rating[];
  @OneToMany(() => Order, (order) => order.product)
  orders!: Order[];
}
