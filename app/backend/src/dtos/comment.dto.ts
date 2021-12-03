import { IsDate, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateCommentDto{
    @IsString()
    @IsOptional()
    title: string;
    
    @IsString()
    @IsOptional()
    comment: string | null;

    @IsPositive()
    score: number;

    @IsDate()
    date: Date;

}