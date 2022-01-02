import { Document, model, Schema } from 'mongoose';
import { Proposal } from '../interfaces/proposal.interface';

const proposalSchema: Schema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  sellerId: {
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
  },
});

export type ProposalModel = Proposal & Document;
export const ProposalModel = model<ProposalModel>('Proposal', proposalSchema);
