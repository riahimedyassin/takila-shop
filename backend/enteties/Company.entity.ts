import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EPriority } from "../types/EPriority";

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
}
