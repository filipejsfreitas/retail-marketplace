import { IsNumber, IsPositive, IsString } from "class-validator";

export class CreateCartItemDto{

    @IsString()
    proposal_id: string;

    @IsNumber()
    @IsPositive()
    quantity: number;
}


export class UpdateCartItemDto{

    @IsNumber()
    @IsPositive()
    quantity: number;

}