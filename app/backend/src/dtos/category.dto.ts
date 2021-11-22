import { IsPositive, IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    parent_id: string | null;

    @IsPositive()
    level: number;

    @IsString()
    name: string;
}