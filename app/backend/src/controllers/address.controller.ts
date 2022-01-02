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
  //@Authorized()
  @UseBefore(validationMiddleware(CreateAddressDto, 'body'))
  @OpenAPI({ summary: 'create address' })
  async createAddress(@Body() addressInfo: CreateAddressDto, @Req() req: RequestWithUser) {
    //const client_id = req.token._id;
    const client_id = "123456";
    const address = await this.addressService.createAddress(client_id, addressInfo);
    return { data: address, message: 'Address Created' };
  }

  @Put('/:id')
  @UseBefore(validationMiddleware(CreateAddressDto, 'body'))
  @OpenAPI({ summary: 'update address' })
  async updateAddress(@Param('id') addressId: string, @Body() addressInfo: CreateAddressDto) {
    const client_id = '123456';
    const address = await this.addressService.updateAddress(client_id, addressInfo, addressId);
    return { data: address, message: 'Address Updated' };
  }

  @Delete('/:id')
  @OpenAPI({ summary: 'delete address' })
  async deleteAddress(@Param('id') addressId: string) {
    const client_id = '123456';
    const address = await this.addressService.deleteAddress(client_id, addressId);
    return { data: address, message: 'Address deleted' };
  }

  @Get('/client')
  @OpenAPI({ summary: 'retrive all clients address information' })
  async getClientAddresses() {
    const client_id = '123456'.toString();
    const address: Address[] = await this.addressService.getClientAddresses(client_id);
    return { data: address, message: 'Clients Addresses retrived' };
  }

  @Get('/:id')
  @OpenAPI({ summary: 'retrive address information' })
  async getAddress(@Param('id') addressId: string) {
    const client_id = '123456';
    const address = await this.addressService.getAddress(client_id, addressId);
    return { data: address, message: 'Address retrived' };
  }
}
