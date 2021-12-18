import { ProductModel } from "@/models/product.model";
import { CommentChecker, CommentProduct, Product } from '@interfaces/product.interface';
import { CreateProductDto } from '@dtos/product.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Console } from "console";

export class ProductService{
    public products = ProductModel;

    public async getproducts(): Promise<Product []> {
        const prodList: Product [] = await this.products.find();

        return prodList;
    }

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

    public async commentProduct(prodId: string, comment: CommentChecker): Promise<Product>{
        if (isEmpty(prodId)) throw new HttpException(400, "You're not productId");
        
        const findProduct: Product = await this.products.findOne({ _id: prodId });
        
        if (!findProduct) throw new HttpException(409, "You're not product");

        var newNumberScores = findProduct.number_scores + 1;

        var newScore = (findProduct.score * findProduct.number_scores + comment.score) / newNumberScores; 

        const updateProductData: Product = await this.products.findOneAndUpdate({_id: prodId},{score:newScore,number_scores: newNumberScores,
            $addToSet:{comments: comment}}, { new: true });

        return updateProductData;
    }

    public async getOneImageId(prodId: string): Promise<string> {
        const prod: Product = await this.findProductById(prodId); 

        return prod.images[0];
    }

    public async updateComment(prodId: string, commentId: string, comment: CommentChecker): Promise<Product> {
        if (isEmpty(prodId)) throw new HttpException(400, "You're not productId");
        
        const findProduct = await this.products.findById( prodId);

        var newScore = 0;

        findProduct.comments.forEach(element => {
            
            if(element._id.toString() === commentId){

                console.log("encontrou comentário")
                if( !(element.client_id.toString() === comment.client_id) ){
                    throw new HttpException(400, "You're not authorized");
                }

                newScore = (findProduct.score * findProduct.number_scores + comment.score - element.score) / findProduct.number_scores; 

            
                element.comment = comment.comment;
                element.title = comment.title;
                element.date = new Date();
                element.score = comment.score;

                
            }

        });

        

        
        /*
        //findProduct.comments.id(commentId)

        
        const parent1 : Product = await this.products.findOneAndUpdate({_id: prodId, "comments._id": commentId},{ $set:{"comments.$.title":comment.title} });
        //const parent : Product = await this.products.findOneAndUpdate({_id: prodId},{ score:newScore},{ new: true });
        */
        const result = await findProduct.save()

        return result;
        
    }

    public async deleteComment(prodId: string, commentId: string, clientId: string): Promise<Product>{
        if (isEmpty(prodId)) throw new HttpException(400, "You're not productId");

        const findProduct: Product = await this.products.findById( prodId);

        console.log(findProduct);

        const oldComment : CommentProduct = findProduct.comments.find(element => element._id.toString() === commentId);

        console.log(oldComment);
        
        if(oldComment.client_id.toString() === clientId){
            
        }else{
            throw new HttpException(400, "You're not authorized");

        }
        
        var newNumberScores = findProduct.number_scores - 1;

        var newScore = (findProduct.score * findProduct.number_scores - oldComment.score) /  newNumberScores; 
       

        const parent : Product = await this.products.findOneAndUpdate({_id: prodId},{score:newScore,number_scores: newNumberScores, $pull: { comments: { _id: commentId} } },
            { new: true });
        return parent;
    }

}