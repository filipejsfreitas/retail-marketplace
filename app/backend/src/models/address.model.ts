import { Document, model, Schema } from 'mongoose';
import { Address } from '../interfaces/address.interface';

const addressSchema: Schema = new Schema({
  clientId: {
    type: String,
    required: true,
  },
  nif: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  postal_code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});

export type AddressModel = Address & Document;
export const AddressModel = model<AddressModel>('Address', addressSchema);
