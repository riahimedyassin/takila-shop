import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({
    type: "varchar",
  })
  name!: string;
  @Column({
    type: "varchar",
  })
  lastname!: string;
  @Column({
    type: "int",
  })
  phone!: number;
  @Column({
    type: "varchar",
    unique: true,
  })
  email!: string;
  @Column({
    type: "varchar",
  })
  password!: string;
  @CreateDateColumn()
  created_at!: Date;
  @UpdateDateColumn()
  updated_at!: Date;
}
