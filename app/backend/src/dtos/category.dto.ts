import { IsPositive, IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    parent_id: string | null;

    @IsString()
    name: string;
}