import { Address } from "../../enteties/Address.entity";

export class AdminGlobalResponse {
    constructor(
        public readonly name : string ,
        public readonly lastname : string ,
        public readonly email : string ,
        public readonly address : Address ,
    ) {

    }
}