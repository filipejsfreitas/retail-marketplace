import { ProductService } from '../services/product.service';
import { Authorized, Body, Controller, Delete, Get, Param, Post, Put, QueryParams, Req, UploadedFiles, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { validationMiddleware } from '../middlewares/express/validation.middleware';
import { CreateCommentDto } from '../dtos/comment.dto';
import fs from 'fs';
import { HttpException } from '../exceptions/HttpException';

import { v4 as uuidv4 } from 'uuid';

import multer from 'multer';

import { Product } from '../interfaces/product.interface';
import { QueryParameters } from 'dtos/query.dto';
import { RequestWithUser } from 'interfaces/auth.interface';

const upload = multer({ dest: './uploads' });

type File = Express.Multer.File;

@Controller('/product')
export class ProductController {
  public productService = new ProductService();

  @Get('/list')
  @OpenAPI({ summary: 'get product list' })
  async getProducts(@QueryParams() parametros: QueryParameters) {
    if (!parametros.limit) {
      parametros.limit = 20;
    }
    if (!parametros.min_rating) {
      parametros.min_rating = 0;
    }
    if (!parametros.page) {
      parametros.page = 0;
    }
    if (!parametros.min_price) {
      parametros.min_price = 0;
    }
    if (!parametros.max_price) {
      parametros.max_price = 100000000000;
    }

    const prodData = await this.productService.listProducts(parametros);
    //const prodData = await this.productService.getproducts();
    return { data: prodData, message: 'found Product' };
  }

  @Get('/category/:category_name')
  @OpenAPI({ summary: 'get products lof category' })
  async getProductsCategory(@Param('category_name') category_name: string) {
    const prodData = await this.productService.getProductByCategoryName(category_name);
    //const prodData = await this.productService.getproducts();
    return { data: prodData, message: 'found Product' };
  }

  @Get('/evaluation/:prodId')
  @Authorized()
  @OpenAPI({ summary: 'get product evaluation' })
  async getEvaluation(@Param('prodId') prodId: string, @Req() req: RequestWithUser) {
    const seller_id = req.token._id;

    const results = await this.productService.getEvaluation(prodId);
    return { data: results, message: 'product evaluation retrieved' };
  }

  @Get('/priceStats')
  @Authorized()
  @OpenAPI({ summary: 'get price stats on all proposals' })
  async getAllPriceStats(@Req() req: RequestWithUser) {
    const sellerId = req.token._id;

    const results = await this.productService.getAllPriceStats(sellerId);
    return { data: results, message: 'price stats retrieved' };
  }

  @Get('/priceStats/:prodId')
  @Authorized()
  @OpenAPI({ summary: 'get price stats on proposal' })
  async getPriceStats(@Param('prodId') prodId: string, @Req() req: RequestWithUser) {
    const sellerId = req.token._id;

    const results = await this.productService.getPriceStats(prodId, sellerId);
    return { data: results, message: 'price stats retrieved' };
  }

  @Get('/sugestions/:prodId')
  @Authorized()
  @OpenAPI({ summary: 'make sugestions of products' })
  async getSugestions(@Param('prodId') prodId: string, @Req() req: RequestWithUser) {
    const clientId = req.token._id;

    const results = await this.productService.getSuggestions(clientId, prodId);
    return { data: results, message: 'sugestion retrieved' };
  }

  @Get('/:id')
  @OpenAPI({ summary: 'get product info' })
  async getProduct(@Param('id') prodId: string) {
    const prodData = await this.productService.findProductById(prodId);
    return { data: prodData, message: 'found Product' };
  }

  @Post('/:id/comment')
  @Authorized()
  @UseBefore(validationMiddleware(CreateCommentDto, 'body'))
  @OpenAPI({ summary: 'comment product' })
  async commentProduct(@Param('id') prodId: string, @Body() prodData: CreateCommentDto, @Req() req: RequestWithUser) {
    const clientId = req.token._id;
    const date: Date = new Date();
    const product = await this.productService.commentProduct(prodId, {
      ...prodData,
      client_id: clientId,
      name: req.token.clientInfo.firstName.concat(' ', req.token.clientInfo.lastName),
      date: date,
    });
    return { data: product, message: 'Product commented' };
  }

  @Put('/:id/comment/:comment_id')
  @Authorized()
  @UseBefore(validationMiddleware(CreateCommentDto, 'body'))
  @OpenAPI({ summary: 'delete comment' })
  async updateComment(
    @Param('id') prodId: string,
    @Param('comment_id') comment_Id: string,
    @Body() prodData: CreateCommentDto,
    @Req() req: RequestWithUser,
  ) {
    const clientId = req.token._id;
    const date: Date = new Date();
    const product = await this.productService.updateComment(prodId, comment_Id, {
      ...prodData,
      client_id: clientId,
      name: req.token.clientInfo.firstName.concat(' ', req.token.clientInfo.lastName),
      date: date,
    });
    return { data: product, message: 'Comment deleted' };
  }

  @Delete('/:id/comment/:comment_id')
  @Authorized()
  @OpenAPI({ summary: 'delete comment' })
  async deleteComment(@Param('id') prodId: string, @Param('comment_id') comment_Id: string, @Req() req: RequestWithUser) {
    const clientId = req.token._id;
    const product = await this.productService.deleteComment(prodId, comment_Id, clientId);
    return { data: product, message: 'Comment deleted' };
  }

  @Post('/')
  //@UseBefore(validationMiddleware(CreateProductInitialDto, 'body'))
  @OpenAPI({ summary: 'create product' })
  async createProduct(@Body() productData, @UploadedFiles('images') imagens: File[]) {
    const imagePaths = [];

    const foldername = uuidv4();

    const chars = JSON.parse(productData.characteristic);

    const forSale = JSON.parse(productData.forSale);

    const tecnical = JSON.parse(productData.tecnical);

    fs.mkdir('./public/' + foldername, { recursive: true }, err => {
      if (err) {
        throw new HttpException(500, err.message);
      }

      imagens.forEach(element => {
        //console.log(element);
        fs.writeFile('./public/' + foldername + '/' + element.originalname, element.buffer, err => {
          if (err) {
            console.log(err);
            throw new HttpException(500, err.message);
          }
        });
      });
    });

    imagens.forEach(element => {
      //console.log(element);
      imagePaths.push(foldername + '/' + element.originalname);
      //console.log(imagePaths);
    });
    console.log(imagePaths);
    /*
        var tempimages = await this.imageService.createImages(imagePaths);

        var imagesId = [];
        tempimages.forEach(element => {
            imagesId.push(element._id.toString());
        });
        console.log(imagesId);
        */
    const product = await this.productService.createProduct({
      name: productData.name,
      description: productData.description,
      category_id: productData.category_id,
      characteristic: chars,
      tecnical: tecnical,
      forSale: forSale,
      images: imagePaths,
    });
    //return {data: product, message: 'Product created'}
    return { data: product, message: 'Product created' };
  }

  //falta apagar as imagens

  @Put('/:id')
  //@UseBefore(validationMiddleware(CreateProductDto, 'body'))
  @OpenAPI({ summary: 'update product' })
  async updateProduct(@Param('id') prodId: string, @Body() productData, @UploadedFiles('images') imagens: File[]) {
    const oldProduct: Product = await this.productService.findProductById(prodId);

    const imagePaths = [];

    const foldername = uuidv4();

    const chars = JSON.parse(productData.characteristic);

    const forSale = JSON.parse(productData.forSale);

    const tecnical = JSON.parse(productData.tecnical);

    const imagesDeleted = JSON.parse(productData.imagesToDelete);
    console.log(imagesDeleted);

    imagesDeleted.forEach(element => {
      fs.unlink('./public/' + element, err => {
        if (err) {
          console.log(err);
          throw new HttpException(500, err.message);
        }
      });
    });

    /*
        imagesDeleted.forEach(element => {
            var index = productData.images.indexOf(element);
            if (index > -1) {
                productData.images.splice(index, 1);
              }
        });
        */

    const oldImages = [];
    oldProduct.images.forEach(element => {
      if (imagesDeleted.indexOf(element) < 0) {
        oldImages.push(element);
      }
    });

    console.log(oldImages);
    let product: Product;

    if (imagens.length > 0) {
      fs.mkdir('./public/' + foldername, { recursive: true }, err => {
        if (err) {
          throw new HttpException(500, err.message);
        }

        imagens.forEach(element => {
          //console.log(element);
          fs.writeFile('./public/' + foldername + '/' + element.originalname, element.buffer, err => {
            if (err) {
              console.log(err);
              throw new HttpException(500, err.message);
            }
          });
        });
      });

      imagens.forEach(element => {
        //console.log(element);
        imagePaths.push(foldername + '/' + element.originalname);
        //console.log(imagePaths);
      });
      /*
            console.log(imagePaths);
            var tempimages = await this.imageService.createImages(imagePaths);

            var imagesId = [];
            tempimages.forEach(element => {
                imagesId.push(element._id.toString());
            });
            */

      product = await this.productService.updateProduct(
        {
          name: productData.name,
          description: productData.description,
          category_id: productData.category_id,
          characteristic: chars,
          tecnical: tecnical,
          forSale: forSale,
          images: oldImages.concat(imagePaths),
        },
        prodId,
      );
    } else {
      product = await this.productService.updateProduct(
        {
          name: productData.name,
          description: productData.description,
          category_id: productData.category_id,
          characteristic: chars,
          tecnical: tecnical,
          forSale: forSale,
          images: oldImages,
        },
        prodId,
      );
    }

    return { data: product, message: 'Product updated' };
  }
  /*
    @Get('/search')
    @OpenAPI({summary: 'update product'})
    async productSearch(@Q)
    */
}
