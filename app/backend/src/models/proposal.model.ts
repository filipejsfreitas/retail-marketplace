import { Document, model, Schema } from 'mongoose';
import { Proposal } from '../interfaces/proposal.interface';

const proposalSchema: Schema = new Schema({
    product_id: {
      type: String,
      required: true
    },
    seller_id: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    shipping: {
        type: Number,
        required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    maxPerPurchase: {
      type: Number,
      required: true,
    },
    special_conditions: {
        type: String,
        required: false,
    }
  });

  export const ProposalModel = model<Proposal & Document>('Proposal', proposalSchema);
