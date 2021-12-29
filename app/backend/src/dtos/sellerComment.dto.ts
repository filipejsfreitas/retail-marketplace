import { IsDate, IsOptional, IsPositive, IsString } from 'class-validator';

export class SellerCommentDto{
    

    @IsPositive()
    rating: number;

}