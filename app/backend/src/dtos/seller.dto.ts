import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateSellerDto{
    @IsString()
    @IsNotEmpty()
    firstName:string;

    @IsString()
    @IsNotEmpty()
    seller_id:string;

    @IsString()
    @IsNotEmpty()
    lastName:string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    companyName: string;

    @IsString()
    @IsNotEmpty()
    tin: string;

    @IsString()
    @IsNotEmpty()
    companyPhoneNumber: string;

    @IsEmail()
    @IsNotEmpty()
    customerServiceEmail: string;

}

export class UpdateSellerDto{
    @IsString()
    @IsNotEmpty()
    firstName:string;

    @IsString()
    @IsNotEmpty()
    lastName:string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    companyName: string;

    @IsString()
    @IsNotEmpty()
    tin: string;

    @IsString()
    @IsNotEmpty()
    companyPhoneNumber: string;

    @IsEmail()
    @IsNotEmpty()
    customerServiceEmail: string;

}