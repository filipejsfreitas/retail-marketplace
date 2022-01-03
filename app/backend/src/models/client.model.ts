import { Document, model, Schema } from 'mongoose';
import { Client } from '../interfaces/client.interface';

const clientSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
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
  birthDate: {
    type: Date,
    required: false,
  },
  favoriteProducts: {
    type: [String],
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
});

export type ClientModel = Client & Document;
export const ClientModel = model<ClientModel>('Client', clientSchema);
