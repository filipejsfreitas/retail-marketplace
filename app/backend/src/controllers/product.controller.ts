import { CreateProductDto } from "@/dtos/product.dto";
import { CreateProductInitialDto } from "@/dtos/productInitial.dto";
import { ImageService } from "@/services/image.service";
import { ProductService } from "@/services/product.service";
import { Controller, Get , JsonController, Param, Post, UseBefore,Body, Put, Delete, UploadedFiles} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { validationMiddleware } from '@middlewares/validation.middleware';
import { CreateCommentDto } from "@/dtos/comment.dto";
import fs from 'fs'
import { HttpException } from '@exceptions/HttpException';

import { v4 as uuidv4 } from 'uuid';

import multer from 'multer';

import path from 'path';
import { idText } from "typescript";
import { Product } from "@/interfaces/product.interface";

const upload = multer({dest:'./uploads'})

type File = Express.Multer.File;

@Controller('/product')
export class ProductController{
    public productService = new ProductService();
    public imageService = new ImageService();

    @Get('/:id')
    @OpenAPI({summary:'get product info'})
    async getProduct(@Param('id') prodId: string) {
        const prodData = await this.productService.findProductById(prodId);
        return { data: prodData, message: 'found Product' };
    }

    @Post('/:id/comment')
    @UseBefore(validationMiddleware(CreateCommentDto, 'body'))
    @OpenAPI({summary: 'comment product'})
    async commentProduct(@Param('id') prodId: string, @Body() prodData: CreateCommentDto) {
        const client_id = "123456";
        const product = await this.productService.commentProduct(prodId,{...prodData,client_id: client_id, name: "nome"});
        return {data: product, message: 'Product commented'}
    }

    @Post('/')
    //@UseBefore(validationMiddleware(CreateProductInitialDto, 'body'))
    @OpenAPI({summary: 'create product'})
    async createProduct( @Body() productData, @UploadedFiles("images") imagens: File[]) {
        var imagePaths = [];
        
        var foldername= uuidv4();

        var chars = JSON.parse(productData.characteristic);

        var forSale = JSON.parse(productData.forSale);

        var tecnical = JSON.parse(productData.tecnical);

        fs.mkdir('./test12/'+foldername, {recursive: true },(err) => {
            if(err) {
                throw new HttpException(500, err.message)
            }

            imagens.forEach(element => {
                //console.log(element);
                fs.writeFile('./test12/'+foldername + '/'+element.originalname,element.buffer, (err) => {
                    if(err) {
                        console.log(err)
                        throw new HttpException(500, err.message)
                    }
                })

                
                imagePaths.push({path:('./test12/'+foldername + '/'+element.originalname)});
                console.log(imagePaths);
            });
        } )

        imagens.forEach(element => {
            //console.log(element);
            imagePaths.push({path:('./test12/'+foldername + '/'+element.originalname)});
            //console.log(imagePaths);
        })
        console.log(imagePaths);
        var tempimages = await this.imageService.createImages(imagePaths);
        
        var imagesId = [];
        tempimages.forEach(element => {
            imagesId.push(element._id.toString());
        });
        console.log(imagesId);
        const product = await this.productService.createProduct({name: productData.name, description: productData.description,category_id: 
        productData.category_id,characteristic: chars,tecnical: tecnical, forSale:forSale, images: imagesId});
        //return {data: product, message: 'Product created'}
        return { message: 'Product created'}
    }

    //falta apagar as imagens
    

    @Put('/:id')
    //@UseBefore(validationMiddleware(CreateProductDto, 'body'))
    @OpenAPI({summary: 'update product'})
    async updateProduct(@Param('id') prodId: string,@Body() productData,@UploadedFiles("images") imagens: File[]) {

        const oldProduct: Product = await this.productService.findProductById(prodId);

        var imagePaths = [];
        
        var foldername= uuidv4();

        var chars = JSON.parse(productData.characteristic);

        var forSale = JSON.parse(productData.forSale);

        var tecnical = JSON.parse(productData.tecnical);

        var imagesDeleted = JSON.parse(productData.imagesToDelete);
        console.log(imagesDeleted);
        /*
        imagesDeleted.forEach(element => {
            var index = productData.images.indexOf(element);
            if (index > -1) {
                productData.images.splice(index, 1);
              }
        });
        */

        

        var oldImages= [];
        oldProduct.images.forEach(element => {
            if(imagesDeleted.indexOf(element) < 0){
                oldImages.push(element);
            }
        });

        console.log(oldImages);
        var product : Product;

        if(imagens.length > 0){

            fs.mkdir('./test12/'+foldername, {recursive: true },(err) => {
                if(err) {
                    throw new HttpException(500, err.message)
                }

                imagens.forEach(element => {
                    //console.log(element);
                    fs.writeFile('./test12/'+foldername + '/'+element.originalname,element.buffer, (err) => {
                        if(err) {
                            console.log(err)
                            throw new HttpException(500, err.message)
                        }
                    })

                    
                    imagePaths.push({path:('./test12/'+foldername + '/'+element.originalname)});
                    console.log(imagePaths);
                });
            } )

            imagens.forEach(element => {
                //console.log(element);
                imagePaths.push({path:('./test12/'+foldername + '/'+element.originalname)});
                //console.log(imagePaths);
            })
            console.log(imagePaths);
            var tempimages = await this.imageService.createImages(imagePaths);
            
            var imagesId = [];
            tempimages.forEach(element => {
                imagesId.push(element._id.toString());
            });


            product = await this.productService.updateProduct({name: productData.name, description: productData.description,category_id: 
                productData.category_id,characteristic: chars,tecnical: tecnical, forSale:forSale, images: oldImages.concat(imagesId)},prodId);
        }else{
            product = await this.productService.updateProduct({name: productData.name, description: productData.description,category_id: 
                productData.category_id,characteristic: chars,tecnical: tecnical, forSale:forSale, images: oldImages},prodId);
        }


        
        return {data: product, message: 'Product updated'}
    }

    
}