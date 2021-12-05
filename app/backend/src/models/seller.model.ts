import { Seller } from '../interfaces/seller.interface';
import { Document, model, Schema } from 'mongoose';

const sellerSchema: Schema = new Schema({
  seller_id: {
    type: String,
    required: false,
    unique: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  companyName: {
    type: String,
    required: false,
  },
  tin: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  companyPhoneNumber: {
    type: String,
    required: false,
  },
  customerServiceEmail: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: true,
  },
  numberRating: {
    type: Number,
    required: true,
  },
});

export const SellerModel = model<Seller & Document>('Seller', sellerSchema);
