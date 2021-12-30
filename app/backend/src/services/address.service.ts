import { CreateAddressDto } from '../dtos/address.dto';
import { Address } from '../interfaces/address.interface';
import { AddressModel } from '../models/address.model';
import { isEmpty } from '../utils/util';
import { HttpException } from '../exceptions/HttpException';

export class AddressService {
  public addresses = AddressModel;

  public async createAddress(client_id: string, address_info: CreateAddressDto): Promise<Address> {
    if (isEmpty(address_info)) throw new HttpException(400, "You're not product");

    const address: Address = await this.addresses.create({ client_id: client_id, ...address_info });

    return address;
  }

  public async updateAddress(client_id: string, address_info: CreateAddressDto, address_id: string): Promise<Address> {
    if (isEmpty(address_info)) throw new HttpException(400, "You're not product");

    const address: Address = await this.addresses.findOneAndUpdate({ _id: address_id, client_id: client_id }, { ...address_info }, { new: true });

    return address;
  }

  public async deleteAddress(client_id: string, address_id: string): Promise<Address> {
    const address: Address = await this.addresses.findOneAndDelete({ _id: address_id, client_id: client_id });

    return address;
  }

  public async getAddress(client_id: string, address_id: string): Promise<Address> {
    const address: Address = await this.addresses.findOne({ _id: address_id, client_id: client_id });

    return address;
  }

  public async getClientAddresses(clientid: string): Promise<Address[]> {
    const address: Address[] = await this.addresses.find({ client_id: clientid });

    return address;
  }
}
