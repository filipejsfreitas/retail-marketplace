import { validationMiddleware } from '../middlewares/express/validation.middleware';
import { SellerService } from '../services/seller.service';
import { Authorized, Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UploadedFiles, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { SellerCommentDto } from '../dtos/sellerComment.dto';
import { UpdateSellerDto } from '../dtos/seller.dto';
import { RequestWithUser } from 'interfaces/auth.interface';
import { InvoiceUpdateDto } from '../dtos/invoice-update.dto';
import fs from 'fs';

import { v4 as uuidv4 } from 'uuid';
import { HttpException } from 'exceptions/HttpException';
import multer from 'multer';

const upload = multer({ dest: './uploads' });

type File = Express.Multer.File;

@Controller('/seller')
export class SellerController {
  public sellerService = new SellerService();

  @Get('/invoice')
  @Authorized()
  @OpenAPI({ summary: 'get seller invoices' })
  async getSellerInvoices(@Req() req: RequestWithUser) {
    const sellerId = req.token._id;
    const info = await this.sellerService.getInvoices(sellerId);

    return { data: info, message: 'Seller invoices retrived' };
  }

  @Get('/invoice/:id')
  @Authorized()
  @OpenAPI({ summary: 'get seller invoices' })
  async getSellerInvoice(@Param('id') invoice_id: string, @Req() req: RequestWithUser) {
    const sellerId = req.token._id;
    const info = await this.sellerService.getInvoice(sellerId, invoice_id);

    return { data: info, message: 'Seller invoice retrived' };
  }

  @Get('/comments/:sellerId')
  @OpenAPI({ summary: 'get seller comments' })
  async getSellerComments(@Param('sellerId') sellerId: string) {
    const info = await this.sellerService.getComments(sellerId);

    return { data: info, message: 'Seller comments retrived' };
  }

  @Get('/:id')
  @OpenAPI({ summary: 'get seller info' })
  async getSeller(@Param('id') sellerId: string) {
    const info = await this.sellerService.getSeller(sellerId);

    return { data: info, message: 'Seller information retrived' };
  }

  @Delete('/comments/:commentId')
  @Authorized()
  @OpenAPI({ summary: 'delete a comment' })
  async deleteComment(@Param('commentId') comment_id: string, @Req() req: RequestWithUser) {
    const clientId = req.token._id;

    const info = await this.sellerService.deleteComment(comment_id, clientId);
    return { data: info, message: 'Comment deleted' };
  }

  @Put('/comment/:commentId')
  @Authorized()
  @OpenAPI({ summary: 'update comment' })
  @UseBefore(validationMiddleware(SellerCommentDto, 'body'))
  async updateComment(@Param('commentId') comment_id: string, @Body() commentData: SellerCommentDto, @Req() req: RequestWithUser) {
    const clientId = req.token._id;

    const info = await this.sellerService.updateComment(comment_id, clientId, commentData);

    return { data: info, message: 'Comment updated' };
  }

  @Put('/invoice/:invoiceId')
  @Authorized('Seller')
  @OpenAPI({ summary: 'update invoice' })
  async updateInvoice(@Param('invoiceId') invoice_id: string, @Body() body: InvoiceUpdateDto, @Req() req: RequestWithUser) {
    const sellerId = req.token._id;

    const info = await this.sellerService.updateInvoice(sellerId, invoice_id, body.state);

    return { data: info, message: 'Invoice updated' };
  }

  @Put('/')
  @Authorized()
  @OpenAPI({ summary: 'update seller' })
  @UseBefore(validationMiddleware(UpdateSellerDto, 'body'))
  async updateSeller(@Body() sellerData: UpdateSellerDto, @Req() req: RequestWithUser) {
    const sellerId = req.token._id;

    const info = await this.sellerService.updateSeller(sellerData, sellerId);

    return { data: info, message: 'Seller updated' };
  }

  // @Post('/')
  // @OpenAPI({ summary: 'create seller' })
  // @UseBefore(validationMiddleware(CreateSellerDto, 'body'))
  // async createSeller(@Body() sellerData: CreateSellerDto) {
  //   const sellerId = '123456';
  //
  //   const info = await this.sellerService.createSeller(sellerData);
  //
  //   return { data: info, message: 'Seller created' };
  // }

  @Post('/image')
  @Authorized()
  @OpenAPI({ summary: 'post seller image' })
  async postImage( @Req() req: RequestWithUser,@UploadedFile('image') imagem: File) {
    const sellerId = req.token._id;

    const foldername = uuidv4();

    fs.mkdir('./public/sellerImage/' + foldername, { recursive: true }, err => {
      if (err) {
        throw new HttpException(500, err.message);
      }
        fs.writeFile('./public/sellerImage/' + foldername + '/' + imagem.originalname, imagem.buffer, err => {
          if (err) {
            console.log(err);
            throw new HttpException(500, err.message);
          }
          let path = 'sellerImage/' + foldername + '/' + imagem.originalname;
          this.sellerService.addImage(sellerId, path).then(result =>{
            return { data: result, message: 'Image added' };
          });
        });
    });
    
  }

  @Put('/image')
  @Authorized()
  @OpenAPI({ summary: 'post seller image' })
  async updateImage( @Req() req: RequestWithUser,@UploadedFile('image') imagem: File) {
    const sellerId = req.token._id;

    const foldername = uuidv4();

    const seller = await this.sellerService.getSeller(sellerId);
    
    fs.unlink('./public/' + seller.image, err => {
      if (err) {
        console.log(err);
        throw new HttpException(500, err.message);
      }
    });

    fs.mkdir('./public/sellerImage/' + foldername, { recursive: true }, err => {
      if (err) {
        throw new HttpException(500, err.message);
      }
        fs.writeFile('./public/sellerImage/' + foldername + '/' + imagem.originalname, imagem.buffer, err => {
          if (err) {
            console.log(err);
            throw new HttpException(500, err.message);
          }
          let path = 'sellerImage/' + foldername + '/' + imagem.originalname;
          this.sellerService.updateImage(sellerId, path).then(result =>{
            return { data: result, message: 'Image updated' };
          });
        });
    });
    
  }



  @Post('/:sellerId/comment')
  @Authorized()
  @OpenAPI({ summary: 'post comment' })
  @UseBefore(validationMiddleware(SellerCommentDto, 'body'))
  async postComment(@Param('sellerId') sellerId: string, @Body() commentData: SellerCommentDto, @Req() req: RequestWithUser) {
    const clientId = req.token._id;

    const info = await this.sellerService.makeComment(commentData, clientId, sellerId);

    return { data: info, message: 'Comment posted' };
  }

  

}
