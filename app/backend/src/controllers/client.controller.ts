import { CreateClientDto, FavoriteDto, UpdateClientDto } from "@/dtos/client.dto";
import { validationMiddleware } from "@/middlewares/validation.middleware";
import { ClientService } from "@/services/client.service";
import { Body, Controller, Delete, Get, Param, Post, Put, UseBefore } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { cli } from "winston/lib/winston/config";


@Controller('/client')
export class ClientController{
    public clientService = new ClientService();

    @Get('/')
    @OpenAPI({summary: 'get client info'})
    async getClient() {
        const client_id= '123456';
        const info = await this.clientService.getClient(client_id);
        return{data: info, message: 'Client information retrived'}
    }

    @Put('/')
    @OpenAPI({summary: 'update client info'})
    @UseBefore(validationMiddleware(UpdateClientDto, 'body'))
    async updateClient(@Body() clientInfo: UpdateClientDto){
        const client_id= '123456';
        const info = await this.clientService.updateClient(clientInfo,client_id);
        return{data: info, message: 'Client information updated'}
    }

    @Post('/')
    @OpenAPI({summary: 'create client info'})
    @UseBefore(validationMiddleware(CreateClientDto, 'body'))
    async createClient(@Body() clientInfo: CreateClientDto){
        const client_id= '123456';
        const info = await this.clientService.createClient(clientInfo);
        return{data: info, message: 'Client created'}
    }

    @Get('/invoice')
    @OpenAPI({summary: 'get client invoices '})
    async getInvoices(){
        const client_id= '123456';
        const info = await this.clientService.getClientInvoices(client_id);
        return{data: info, message: 'Client invoices retrieved'}
    }

    @Get('/invoice/:id')
    @OpenAPI({summary: 'get client invoices '})
    async getInvoice(@Param('id') invoice_id: string){
        const client_id= '123456';
        const info = await this.clientService.getInvoice(client_id, invoice_id);
        return{data: info, message: 'Client invoice retrieved'}
    }

    @Post('/favorites')
    @OpenAPI({summary: 'add product to favorites'})
    @UseBefore(validationMiddleware(FavoriteDto, 'body'))
    async addToFavorites(@Body() productInfo: FavoriteDto){
        const client_id= '123456';
        const info = await this.clientService.addToFavorites(client_id, productInfo.product_id);
        return{data: info, message: 'Client favorites updated'}
    }

    @Delete('/favorites/:id')
    @OpenAPI({summary: 'delete product from favorites'})
    async deleteFromFavorites(@Param('id') product_id: string){
        const client_id= '123456';
        const info = await this.clientService.deleteFromFavorites(client_id, product_id);
        return{data: info, message: 'Client favorites updated'}
    }

}