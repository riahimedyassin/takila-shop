import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
