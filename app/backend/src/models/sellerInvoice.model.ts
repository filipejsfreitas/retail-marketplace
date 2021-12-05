import { Document, model, Schema } from 'mongoose';
import { SellerInvoice } from '../interfaces/sellerInvoice.interface';

const sellerInvoiceSchema: Schema = new Schema({
  seller_id: {
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
    type: [{ quantity: Number, price: Number, shipping: Number, product_id: String, proposal_id: String, special_conditions: String }],
    required: true,
  },
});

export const SellerInvoiceModel = model<SellerInvoice & Document>('SellerInvoice', sellerInvoiceSchema);
