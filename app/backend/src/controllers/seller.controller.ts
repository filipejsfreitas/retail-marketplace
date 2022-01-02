import { validationMiddleware } from '../middlewares/express/validation.middleware';
import { SellerService } from '../services/seller.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { SellerCommentDto } from '../dtos/sellerComment.dto';
import { UpdateSellerDto } from '../dtos/seller.dto';

@Controller('/seller')
export class SellerController {
  public sellerService = new SellerService();

  @Get('/invoice')
  @OpenAPI({ summary: 'get seller invoices' })
  async getSellerInvoices() {
    const sellerId = '123456';
    const info = await this.sellerService.getInvoices(sellerId);

    return { data: info, message: 'Seller invoices retrived' };
  }

  @Get('/invoice/:id')
  @OpenAPI({ summary: 'get seller invoices' })
  async getSellerInvoice(@Param('id') invoice_id: string) {
    const sellerId = '123456';
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
  @OpenAPI({ summary: 'delete a comment' })
  async deleteComment(@Param('commentId') comment_id: string) {
    const clientId = '123456';

    const info = await this.sellerService.deleteComment(comment_id, clientId);
    return { data: info, message: 'Comment deleted' };
  }

  @Put('/comment/:commentId')
  @OpenAPI({ summary: 'update comment' })
  @UseBefore(validationMiddleware(SellerCommentDto, 'body'))
  async updateComment(@Param('commentId') comment_id: string, @Body() commentData: SellerCommentDto) {
    const clientId = '123456';

    const info = await this.sellerService.updateComment(comment_id, clientId, commentData);

    return { data: info, message: 'Comment updated' };
  }

  @Put('/invoice/:invoiceId')
  @OpenAPI({ summary: 'update invoice' })
  async updateInvoice(@Param('invoiceId') invoice_id: string) {
    const sellerId = '123456';

    const info = await this.sellerService.updateInvoice(sellerId, invoice_id, 'modified');

    return { data: info, message: 'Invoice updated' };
  }

  @Put('/')
  @OpenAPI({ summary: 'update seller' })
  @UseBefore(validationMiddleware(UpdateSellerDto, 'body'))
  async updateSeller(@Body() sellerData: UpdateSellerDto) {
    const sellerId = '123456';

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

  @Post('/:sellerId/comment')
  @OpenAPI({ summary: 'post comment' })
  @UseBefore(validationMiddleware(SellerCommentDto, 'body'))
  async postComment(@Param('sellertId') sellerId: string, @Body() commentData: SellerCommentDto) {
    const clientId = '123456';

    const info = await this.sellerService.makeComment(commentData, clientId, sellerId);

    return { data: info, message: 'Comment posted' };
  }
}
