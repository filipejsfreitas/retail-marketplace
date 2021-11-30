import { IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @IsOptional()
    parent_id: string | null;

    @IsString()
    name: string;
}