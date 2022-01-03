import { CreateAddressDto } from '../dtos/address.dto';
import { Address } from '../interfaces/address.interface';
import { AddressModel } from '../models/address.model';
import { isEmpty } from '../utils/util';
import { HttpException } from '../exceptions/HttpException';

export class AddressService {
  public addresses = AddressModel;

  public async createAddress(clientId: string, address_info: CreateAddressDto): Promise<Address> {
    if (isEmpty(address_info)) throw new HttpException(400, "You're not product");

    const address: Address = await this.addresses.create({ client_id: clientId, ...address_info });

    return address;
  }

  public async updateAddress(clientId: string, address_info: CreateAddressDto, address_id: string): Promise<Address> {
    if (isEmpty(address_info)) throw new HttpException(400, "You're not product");

    const address: Address = await this.addresses.findOneAndUpdate({ _id: address_id, client_id: clientId }, { ...address_info }, { new: true });

    return address;
  }

  public async deleteAddress(clientId: string, address_id: string): Promise<Address> {
    const address: Address = await this.addresses.findOneAndDelete({ _id: address_id, client_id: clientId });

    return address;
  }

  public async getAddress(clientId: string, address_id: string): Promise<Address> {
    const address: Address = await this.addresses.findOne({ _id: address_id, client_id: clientId });

    return address;
  }

  public async getClientAddresses(clientid: string): Promise<Address[]> {
    const address: Address[] = await this.addresses.find({ client_id: clientid });

    return address;
  }
}
