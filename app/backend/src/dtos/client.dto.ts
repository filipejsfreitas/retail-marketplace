import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateClientDto{
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    //@IsDate()
    //@IsNotEmpty()
    //birthDate: Date;

    @IsString()
    @IsNotEmpty()
    client_id: string;
   
}

export class UpdateClientDto{
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    //@IsDate()
    //@IsNotEmpty()
    //birthDate: Date;
   
}

export class FavoriteDto{
    @IsString()
    @IsNotEmpty()
    product_id: string;
}