import { validationMiddleware } from '../middlewares/express/validation.middleware';
import { SellerService } from '../services/seller.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { SellerCommentDto } from '../dtos/sellerComment.dto';
import { CreateSellerDto, UpdateSellerDto } from '../dtos/seller.dto';

@Controller('/seller')
export class SellerController {
  public sellerService = new SellerService();

  @Get('/invoice')
  @OpenAPI({ summary: 'get seller invoices' })
  async getSellerInvoices() {
    const seller_id = '123456';
    const info = await this.sellerService.getInvoices(seller_id);

    return { data: info, message: 'Seller invoices retrived' };
  }

  @Get('/invoice/:id')
  @OpenAPI({ summary: 'get seller invoices' })
  async getSellerInvoice(@Param('id') invoice_id: string) {
    const seller_id = '123456';
    const info = await this.sellerService.getInvoice(seller_id, invoice_id);

    return { data: info, message: 'Seller invoice retrived' };
  }

  @Get('/comments/:sellerId')
  @OpenAPI({ summary: 'get seller comments' })
  async getSellerComments(@Param('sellerId') seller_id: string) {
    const info = await this.sellerService.getComments(seller_id);

    return { data: info, message: 'Seller comments retrived' };
  }

  @Get('/:id')
  @OpenAPI({ summary: 'get seller info' })
  async getSeller(@Param('id') seller_id: string) {
    const info = await this.sellerService.getSeller(seller_id);

    return { data: info, message: 'Seller information retrived' };
  }

  @Delete('/comments/:commentId')
  @OpenAPI({ summary: 'delete a comment' })
  async deleteComment(@Param('commentId') comment_id: string) {
    const client_id = '123456';

    const info = await this.sellerService.deleteComment(comment_id, client_id);
    return { data: info, message: 'Comment deleted' };
  }

  @Put('/comment/:commentId')
  @OpenAPI({ summary: 'update comment' })
  @UseBefore(validationMiddleware(SellerCommentDto, 'body'))
  async updateComment(@Param('commentId') comment_id: string, @Body() commentData: SellerCommentDto) {
    const client_id = '123456';

    const info = await this.sellerService.updateComment(comment_id, client_id, commentData);

    return { data: info, message: 'Comment updated' };
  }

  @Put('/invoice/:invoiceId')
  @OpenAPI({ summary: 'update invoice' })
  async updateInvoice(@Param('invoiceId') invoice_id: string) {
    const seller_id = '123456';

    const info = await this.sellerService.updateInvoice(seller_id, invoice_id, 'modified');

    return { data: info, message: 'Invoice updated' };
  }

  @Put('/')
  @OpenAPI({ summary: 'update seller' })
  @UseBefore(validationMiddleware(UpdateSellerDto, 'body'))
  async updateSeller(@Body() sellerData: UpdateSellerDto) {
    const seller_id = '123456';

    const info = await this.sellerService.updateSeller(sellerData, seller_id);

    return { data: info, message: 'Seller updated' };
  }

  @Post('/')
  @OpenAPI({ summary: 'create seller' })
  @UseBefore(validationMiddleware(CreateSellerDto, 'body'))
  async createSeller(@Body() sellerData: CreateSellerDto) {
    const seller_id = '123456';

    const info = await this.sellerService.createSeller(sellerData);

    return { data: info, message: 'Seller created' };
  }

  @Post('/:sellerId/comment')
  @OpenAPI({ summary: 'post comment' })
  @UseBefore(validationMiddleware(SellerCommentDto, 'body'))
  async postComment(@Param('sellertId') seller_id: string, @Body() commentData: SellerCommentDto) {
    const client_id = '123456';

    const info = await this.sellerService.makeComment(commentData, client_id, seller_id);

    return { data: info, message: 'Comment posted' };
  }
}
