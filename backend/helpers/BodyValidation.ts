import { ValidationError } from "class-validator";

export const bodyValidation=(errors : ValidationError[]) => {
    console.log(errors); 
}