import { Document, model, Schema } from 'mongoose';
import { ClientInvoice } from '../interfaces/clientInvoice.interface';

const clientInvoiceSchema: Schema = new Schema({
  clientId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  address: {
    type: { nif: String, address: String, postal_code: String, name: String, contact: String },
    required: true,
  },
  items: {
    type: [
      {
        quantity: Number,
        price: Number,
        shipping: Number,
        productId: String,
        proposal_id: String,
        sellerId: String,
        state: String,
        special_conditions: String,
      },
    ],
    required: true,
  },
});

export type ClientInvoiceModel = ClientInvoice & Document;
export const ClientInvoiceModel = model<ClientInvoiceModel>('ClientInvoice', clientInvoiceSchema);
