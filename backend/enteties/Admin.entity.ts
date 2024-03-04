import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { User } from "./User.entity";
import { ProductLogs } from "./ProductLogs.entity";
import { Address } from "./Address.entity";


@Entity()
export class Admin extends User {
  @Column({
    type: "boolean",
    default: false
  })
  isSup!: boolean;
  @OneToMany(() => ProductLogs,(prod_log) => prod_log.admin)
  prod_log! : ProductLogs[]
  @OneToOne(()=> Address,(address)=>address.admin,{eager:true} )
  @JoinColumn()
  address! : Address
}
