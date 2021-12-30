import { CartItem } from '../interfaces/cartItem.interface';
import { Document, model, Schema } from 'mongoose';

const cartItemSchema: Schema = new Schema({
  product_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  client_id: {
    type: String,
    required: true,
  },
  proposal_id: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
  locked: {
    type: Boolean,
    required: true,
  },
  shipping: {
    type: Number,
    required: true,
  },
  seller_id: {
    type: String,
    required: true,
  },
  special_conditions: {
    type: String,
    required: false,
  },
});

export const CartItemModel = model<CartItem & Document>('Cartitem', cartItemSchema);
