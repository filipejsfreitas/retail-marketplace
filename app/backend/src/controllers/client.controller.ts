import { FavoriteDto, UpdateClientDto } from '../dtos/client.dto';
import { validationMiddleware } from '../middlewares/express/validation.middleware';
import { ClientService } from '../services/client.service';
import { Authorized, Body, Controller, Delete, Get, Param, Post, Put, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Singleton } from 'typescript-ioc';
import { RequestWithUser } from 'interfaces/auth.interface';
import { StringMap } from 'ts-jest/dist/types';

@Singleton
@Controller('/client')
export class ClientController {
  public clientService = new ClientService();

  @Get('/')
  @Authorized()
  @OpenAPI({ summary: 'get client info' })
  async getClient(@Req() req: RequestWithUser) {
    const clientId = req.token._id;
    const info = await this.clientService.getClient(clientId);
    return { data: info, message: 'Client information retrived' };
  }

  @Put('/')
  @Authorized()
  @OpenAPI({ summary: 'update client info' })
  @UseBefore(validationMiddleware(UpdateClientDto, 'body'))
  async updateClient(@Body() clientInfo: UpdateClientDto, @Req() req: RequestWithUser) {
    const clientId = req.token._id;
    const info = await this.clientService.updateClient(clientInfo, clientId);
    return { data: info, message: 'Client information updated' };
  }

  // @Post('/')
  // @Authorized(['Client'])
  // @OpenAPI({ summary: 'create client info' })
  // @UseBefore(validationMiddleware(CreateClientDto, 'body'))
  // async createClient(@Body() clientInfo: CreateClientDto, @Req() req: RequestWithUser) {
  //   const clientId = '123456';
  //   const info = await this.clientService.createClient(clientInfo, req.user._id);
  //   return { data: info, message: 'Client created' };
  // }

  @Get('/invoice')
  @Authorized()
  @OpenAPI({ summary: 'get client invoices ' })
  async getInvoices(@Req() req: RequestWithUser) {
    const clientId = req.token._id;
    const info = await this.clientService.getClientInvoices(clientId);
    return { data: info, message: 'Client invoices retrieved' };
  }

  @Get('/invoice/:id')
  @Authorized()
  @OpenAPI({ summary: 'get client invoices ' })
  async getInvoice(@Param('id') invoice_id: string, @Req() req: RequestWithUser) {
    const clientId = req.token._id;
    const info = await this.clientService.getInvoice(clientId, invoice_id);
    return { data: info, message: 'Client invoice retrieved' };
  }

  @Post('/favorites')
  @Authorized()
  @OpenAPI({ summary: 'add product to favorites' })
  @UseBefore(validationMiddleware(FavoriteDto, 'body'))
  async addToFavorites(@Body() productInfo: FavoriteDto,@Req() req: RequestWithUser) {
    const clientId = req.token._id;
    const info = await this.clientService.addToFavorites(clientId, productInfo.productId);
    return { data: info, message: 'Client favorites updated' };
  }

  @Delete('/favorites/:id')
  @Authorized()
  @OpenAPI({ summary: 'delete product from favorites' })
  async deleteFromFavorites(@Param('id') productId: string,@Req() req: RequestWithUser) {
    const clientId = req.token._id;
    const info = await this.clientService.deleteFromFavorites(clientId, productId);
    return { data: info, message: 'Client favorites updated' };
  }
}
