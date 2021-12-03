import { ProductModel } from "@/models/product.model";
import { CommentProduct, Product } from '@interfaces/product.interface';
import { CreateProductDto } from '@dtos/product.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

export class ProductService{
    public products = ProductModel;

    public async createProduct(productData: CreateProductDto): Promise<Product> {
        if (isEmpty(productData)) throw new HttpException(400, "You're not product");

        const createProductData: Product = await this.products.create({ ...productData,number_scores: 0, 
            score:0,number_views:0,comments: [], best_offer:0 });

        return createProductData;
    }

    public async updateProduct(productData: CreateProductDto, prodId: string): Promise<Product> {
        if (isEmpty(productData)) throw new HttpException(400, "You're not product");

        const product: Product = await this.products.findOne({_id: prodId});
        if(!product) throw new HttpException(409, `You're product does not exists`);
        const updateProductData: Product = await this.products.findOneAndUpdate({_id: prodId},{ ...productData},{new: true});

        return updateProductData;
    }

    public async findProductById(prodId: string): Promise<Product>{ 
        if (isEmpty(prodId)) throw new HttpException(400, "You're not productId");
        
        const findProduct: Product = await this.products.findOne({ _id: prodId });
        
        if (!findProduct) throw new HttpException(409, "You're not product");
    
        return findProduct;
    }

    public async commentProduct(prodId: string, comment: CommentProduct): Promise<Product>{
        if (isEmpty(prodId)) throw new HttpException(400, "You're not productId");
        
        const findProduct: Product = await this.products.findOne({ _id: prodId });
        
        if (!findProduct) throw new HttpException(409, "You're not product");

        var newScore = findProduct.score * findProduct.number_scores + comment.score;

        var newNumber_view = findProduct.number_views + 1;
        const updateProductData: Product = await this.products.findOneAndUpdate({_id: prodId},{score:newScore, number_views: newNumber_view,
            $addToSet:{comments: comment}});

        return updateProductData;
    }

    public async getOneImageId(prodId: string): Promise<string> {
        const prod: Product = await this.findProductById(prodId); 

        return prod.images[0];
    }

}