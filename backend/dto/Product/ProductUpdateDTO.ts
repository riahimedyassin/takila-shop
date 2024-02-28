import { Max, MaxLength, Min, MinLength } from "class-validator";

export class ProductUpdateDTO {
    @MinLength(1)
    @MaxLength(50)
    title : string ;
    @MinLength(20)
    @MaxLength(200) 
    content : string ;
    @Min(1) 
    original_price : number ;
    @Min(1) 
    sale_price:number ;
    @Min(0) 
    quantity : number ; 
    available : boolean ; 
    constructor(
        title : string ,
        content : string ,
        original_price : number , 
        sale_price:number , 
        quantity : number , 
        available : boolean  
    ){  
        this.title=title
        this.content=content
        this.original_price=original_price
        this.sale_price=sale_price
        this.available=available
        this.quantity=quantity
    }
}