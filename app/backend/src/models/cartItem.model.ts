import { CartItem } from '@/interfaces/cartItem.interface';
import { model, Schema, Document } from 'mongoose';

const cartItemSchema: Schema = new Schema({
    product_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    client_id: {
        type: String,
        required: true
    },
    proposal_id: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: true
    },
    locked: {
        type: Boolean,
        required: true
    },
    shipping: {
        type: Number,
        required: true
    }
})


export const CartItemModel = model<CartItem & Document>('Cartitem', cartItemSchema);