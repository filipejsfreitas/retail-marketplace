import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

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
