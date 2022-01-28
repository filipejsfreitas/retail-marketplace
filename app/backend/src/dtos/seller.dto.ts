import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateSellerDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

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
