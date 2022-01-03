import { Document, model, Schema } from 'mongoose';
import { SellerInvoice } from '../interfaces/sellerInvoice.interface';

const sellerInvoiceSchema: Schema = new Schema({
  sellerId: {
    type: String,
    required: true,
  },
  invoice_id: {
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
  state: {
    type: String,
    required: true,
  },
  items: {
    type: [{ quantity: Number, price: Number, shipping: Number, productId: String, proposal_id: String, special_conditions: String }],
    required: true,
  },
});

export type SellerInvoiceModel = SellerInvoice & Document;
export const SellerInvoiceModel = model<SellerInvoiceModel>('SellerInvoice', sellerInvoiceSchema);
