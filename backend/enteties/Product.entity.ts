import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

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
}
