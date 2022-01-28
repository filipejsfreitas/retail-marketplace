import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  // @IsString()
  // @IsNotEmpty()
  // phoneNumber: string;
}

export class CreateClientWithUserDto extends CreateClientDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public passwordConfirmation: string;
}

export class CreateSellerDto extends CreateClientDto {
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

export class CreateSellerWithUserDto extends CreateSellerDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public passwordConfirmation: string;
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
