import { IsDate, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateProposalDto{
    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    shipping: number;

    @IsNumber()
    stock: number;

    @IsNumber()
    maxPerPurchase: number;

    @IsString()
    product_id: string;

    @IsString()
    @IsOptional()
    special_conditions: string;
}

export class UpdateProposalDto{
    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @IsPositive()
    shipping: number;

    @IsNumber()
    stock: number;

    @IsNumber()
    maxPerPurchase: number;

    @IsString()
    @IsOptional()
    special_conditions: string;
}