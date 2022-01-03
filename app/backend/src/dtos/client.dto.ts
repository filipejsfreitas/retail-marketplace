import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateClientDto {
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

export class FavoriteDto {
  @IsString()
  @IsNotEmpty()
  productId: string;
}
