import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({
    type: "varchar",
  })
  content!: string;
  @Column({
    type: "int",
  })
  score!: number;
}
