import { IsDate, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class SellerCommentDto{
    @IsNumber()
    support_rating: number;

    @IsNumber()
    shipping_rating: number;

}