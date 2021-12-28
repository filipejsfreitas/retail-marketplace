
import { model, Schema, Document } from 'mongoose';
import {Address} from '@interfaces/address.interface'

const addressSchema: Schema = new Schema({
    client_id: {
        type: String,
        required: true
    },
    nif: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    }
})

export const AddressModel = model<Address & Document>('Address', addressSchema);
