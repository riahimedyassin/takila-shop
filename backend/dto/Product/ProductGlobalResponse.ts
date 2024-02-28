import { ProductUpdateDTO } from "./ProductUpdateDTO";

export class ProductGlobalResponse extends ProductUpdateDTO {
    id : number 
    constructor( 
        id : number ,
        title : string ,
        content : string ,
        original_price : number , 
        sale_price:number , 
        quantity : number , 
        available : boolean  ) {
        super(title,content,original_price,sale_price,quantity,available); 
        this.id=id; 
    }
}