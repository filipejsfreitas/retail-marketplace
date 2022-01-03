import { SellerComment } from '../interfaces/sellerComment.interface';
import { Document, model, Schema } from 'mongoose';

const sellerCommentSchema: Schema = new Schema({
  clientId: {
    type: String,
    required: true,
  },
  sellerId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  shipping_rating: {
    type: Number,
    required: true,
  },
  support_rating: {
    type: Number,
    required: true,
  },
});

export type SellerCommentModel = SellerComment & Document;
export const SellerCommentModel = model<SellerCommentModel>('SellerComment', sellerCommentSchema);
