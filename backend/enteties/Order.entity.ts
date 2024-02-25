import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

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
  delivered!: boolean;
  @CreateDateColumn()
  created_at!: Date;
  @UpdateDateColumn()
  updated_at!: Date;
}
