import { Authorized, Body, Controller, Delete, Get, Param, Post, Put, Req, UseBefore } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { validationMiddleware } from '../middlewares/express/validation.middleware';
import { AddressService } from '../services/address.service';
import { CreateAddressDto } from '../dtos/address.dto';
import { Address } from '../interfaces/address.interface';
import { RequestWithUser } from 'interfaces/auth.interface';

@Controller('/address')
export class AddressController {
  public addressService = new AddressService();

  @Post('/')
  @Authorized()
  @UseBefore(validationMiddleware(CreateAddressDto, 'body'))
  @OpenAPI({ summary: 'create address' })
  async createAddress(@Body() addressInfo: CreateAddressDto, @Req() req: RequestWithUser) {
    const clientId = req.token._id;
    const address = await this.addressService.createAddress(clientId, addressInfo);
    return { data: address, message: 'Address Created' };
  }

  @Put('/:id')
  @Authorized()
  @UseBefore(validationMiddleware(CreateAddressDto, 'body'))
  @OpenAPI({ summary: 'update address' })
  async updateAddress(@Param('id') addressId: string, @Body() addressInfo: CreateAddressDto,@Req() req: RequestWithUser) {
    const clientId = req.token._id;
    const address = await this.addressService.updateAddress(clientId, addressInfo, addressId);
    return { data: address, message: 'Address Updated' };
  }

  @Delete('/:id')
  @Authorized()
  @OpenAPI({ summary: 'delete address' })
  async deleteAddress(@Param('id') addressId: string,@Req() req: RequestWithUser) {
    const clientId = req.token._id;
    const address = await this.addressService.deleteAddress(clientId, addressId);
    return { data: address, message: 'Address deleted' };
  }

  @Get('/client')
  @Authorized()
  @OpenAPI({ summary: 'retrive all clients address information' })
  async getClientAddresses(@Req() req: RequestWithUser) {
    const clientId = req.token._id;
    const address: Address[] = await this.addressService.getClientAddresses(clientId);
    return { data: address, message: 'Clients Addresses retrived' };
  }

  @Get('/:id')
  @Authorized()
  @OpenAPI({ summary: 'retrive address information' })
  async getAddress(@Param('id') addressId: string,@Req() req: RequestWithUser) {
    const clientId = req.token._id;
    const address = await this.addressService.getAddress(clientId, addressId);
    return { data: address, message: 'Address retrived' };
  }
}
