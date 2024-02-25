import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({
    type: "varchar",
  })
  city!: string;
  @Column({
    type: "varchar",
  })
  street!: string;
  @Column({
    default: "Tunisia",
    type: "varchar",
  })
  country!: string;
  @Column({
    type: "int",
  })
  postcode!: number;
  @Column({
    type: "varchar",
  })
  region!: string;
}
