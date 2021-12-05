import { CreateClientDto, UpdateClientDto } from '../dtos/client.dto';
import { HttpException } from '../exceptions/HttpException';
import { Client } from '../interfaces/client.interface';
import { ClientInvoice } from '../interfaces/clientInvoice.interface';
import { ClientModel } from '../models/client.model';
import { ClientInvoiceModel } from '../models/clientInvoice.model';
import { ProductModel } from '../models/product.model';

export class ClientService {
  public clients = ClientModel;
  public clientInvoices = ClientInvoiceModel;
  public products = ProductModel;

  public async createClient(client: CreateClientDto): Promise<Client> {
    const clientCreated = await this.clients.create({
      firstName: client.firstName,
      lastName: client.lastName,
      phoneNumber: client.phoneNumber,
      favoriteProducts: [],
      client_id: client.client_id,
    });

    return clientCreated;
  }

  public async updateClient(client: UpdateClientDto, client_id): Promise<Client> {
    const clientUpdated = await this.clients.findOneAndUpdate(
      { client_id: client_id },
      { firstName: client.firstName, lastName: client.lastName, phoneNumber: client.phoneNumber },
      { new: true },
    );

    return clientUpdated;
  }

  public async getClient(client_id: string) {
    const client = await this.clients.findOne({ client_id: client_id });

    return client;
  }

  public async addToFavorites(client_id: string, product_id: string): Promise<Client> {
    const client = await this.clients.findOne({ client_id: client_id });

    const product = await this.products.findOne({ _id: product_id });

    if (!product) {
      throw new HttpException(400, 'Invalid product');
    }

    client.favoriteProducts.push(product_id);

    const result = await client.save();

    return result;
  }

  public async deleteFromFavorites(client_id: string, product_id: string): Promise<Client> {
    const client = await this.clients.findOne({ client_id: client_id });

    const index = client.favoriteProducts.indexOf(product_id);

    if (index >= 0) {
      client.favoriteProducts.splice(index, 1);
    }

    const result = await client.save();

    return result;
  }

  public async getClientInvoices(client_id: string): Promise<ClientInvoice[]> {
    const invoices: ClientInvoice[] = await this.clientInvoices.find({ client_id: client_id });

    return invoices;
  }

  public async getInvoice(client_id: string, invoice_id: string): Promise<ClientInvoice> {
    const invoice: ClientInvoice = await this.clientInvoices.findOne({ client_id: client_id, _id: invoice_id });

    return invoice;
  }
}
