import { Characteristic } from "@/interfaces/product.interface";
import { IsArray, IsBoolean, IsString } from "class-validator";



export class CreateProductInitialDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    category_id: string;
    
    @IsArray()
    images: Array<File>;

    @IsArray()
    characteristic: Array<Characteristic>;

    @IsArray()
    tecnical: Array<string>;

    @IsBoolean()
    forSale: boolean;

}