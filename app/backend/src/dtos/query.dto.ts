import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class QueryParameters{
    @IsString()
    @IsOptional()
    category_id: string

    @IsOptional()
    @IsString()
    order_by: string
    
    @IsOptional()
    @IsString()
    sort_by: string

    @IsNumber()
    @IsOptional()
    min_price: number

    @IsOptional()
    @IsPositive()
    max_price: number

    @IsOptional()
    @IsNumber()
    min_rating: number

    @IsOptional()
    @IsNumber()
    page: number

    @IsOptional()
    @IsPositive()
    limit: number

    @IsOptional()
    @IsString()
    search: string


}