import { SellerComment } from '@/interfaces/sellerComment.interface';
import { model, Schema, Document } from 'mongoose';


const sellerCommentSchema: Schema = new Schema({
    client_id: {
        type: String,
        required: true
    },
    seller_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
})

export const SellerCommentModel = model<SellerComment & Document>('SellerComment', sellerCommentSchema);