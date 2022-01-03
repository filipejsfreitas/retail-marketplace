import { Singleton } from 'typescript-ioc';
import { UpdateClientDto } from '../dtos/client.dto';
import { HttpException } from '../exceptions/HttpException';
import { Client } from '../interfaces/client.interface';
import { ClientInvoice } from '../interfaces/clientInvoice.interface';
import { ClientModel } from '../models/client.model';
import { ClientInvoiceModel } from '../models/clientInvoice.model';
import { ProductModel } from '../models/product.model';
import { CreateClientDto } from '../dtos/users.dto';

@Singleton
export class ClientService {
  public clients = ClientModel;
  public clientInvoices = ClientInvoiceModel;
  public products = ProductModel;

  public async createClient(client: CreateClientDto, userId: string): Promise<ClientModel> {
    const clientCreated = await this.clients.create({
      firstName: client.firstName,
      lastName: client.lastName,
      favoriteProducts: [],
      userId: userId,
    });

    return clientCreated;
  }

  public async updateClient(client: UpdateClientDto, clientId): Promise<Client> {
    const clientUpdated = await this.clients.findOneAndUpdate(
      { userId: clientId },
      { firstName: client.firstName, lastName: client.lastName, phoneNumber: client.phoneNumber },
      { new: true },
    );

    return clientUpdated;
  }

  public async getClient(clientId: string) {
    const client = await this.clients.findOne({ userId: clientId });

    return client;
  }

  public async addToFavorites(clientId: string, productId: string): Promise<Client> {
    const client = await this.clients.findOne({ userId: clientId });

    const product = await this.products.findOne({ _id: productId });

    if (!product) {
      throw new HttpException(400, 'Invalid product');
    }

    client.favoriteProducts.push(productId);

    const result = await client.save();

    return result;
  }

  public async deleteFromFavorites(clientId: string, productId: string): Promise<Client> {
    const client = await this.clients.findOne({ userId: clientId });

    const index = client.favoriteProducts.indexOf(productId);

    if (index >= 0) {
      client.favoriteProducts.splice(index, 1);
    }

    const result = await client.save();

    return result;
  }

  public async getClientInvoices(clientId: string): Promise<ClientInvoice[]> {
    const invoices: ClientInvoice[] = await this.clientInvoices.find({ clientId: clientId });

    return invoices;
  }

  public async getInvoice(clientId: string, invoice_id: string): Promise<ClientInvoice> {
    const invoice: ClientInvoice = await this.clientInvoices.findOne({ clientId: clientId, _id: invoice_id });

    return invoice;
  }
}
