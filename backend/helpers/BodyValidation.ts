import { ValidationError } from "class-validator";


/**
 * @function
 * @description Check if there is any validation error and throw an error if exist
 * @param {ValidationError[]} errors 
 */
export const bodyValidation=(errors : ValidationError[]) => {
    console.log(errors); 
}