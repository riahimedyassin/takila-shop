import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Admin } from "./Admin.entity";
import { Company } from "./Company.entity";
import { Client } from "./Client.entity";

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
  @OneToOne(()=>Admin,(admin) => admin.address )
  admin!: Admin
  @OneToOne(()=>Client,(client) => client.address )
  client!: Client
  @OneToOne(()=> Company,(company) => company.address)
  company! : Company ; 
  
}
