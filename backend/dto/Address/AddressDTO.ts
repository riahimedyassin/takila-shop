import { Length, MaxLength, MinLength } from "class-validator";

export class AddressDTO {
  @MinLength(4)
  @MaxLength(20)
  city: string;
  @MinLength(4)
  @MaxLength(40)
  street: string;
  @MinLength(4)
  @MaxLength(20)
  country: string;
  @Length(4)
  postcode: number;
  @MinLength(4)
  @MaxLength(20)
  region: string;
  constructor(
    city: string,
    street: string,
    country: string = "Tunisia",
    postcode: number,
    region: string
  ) {
    this.city = city;
    this.street = street;
    this.country = country;
    this.postcode = postcode;
    this.region = region;
  }
  public static fromAny(body: any): AddressDTO {
    return new AddressDTO(
      body.city,
      body.street,
      body.country,
      body.postcode,
      body.region
    );
  }
}
