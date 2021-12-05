import { Document, model, Schema } from 'mongoose';
import { Product } from '../interfaces/product.interface';

const productSchema: Schema = new Schema({
  category_id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  number_scores: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  number_views: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  characteristic: {
    type: [{ name: String, value: String }],
    required: true,
  },
  tecnical: {
    type: [String],
    required: true,
  },
  comments: {
    type: [{ score: Number, comment: String, title: String, date: Date, client_id: String, name: String }],
    required: true,
  },
  best_offer: {
    type: Number,
    required: true,
  },
  forSale: {
    type: Boolean,
    required: true,
  },
});

export const ProductModel = model<Product & Document>('Product', productSchema);
