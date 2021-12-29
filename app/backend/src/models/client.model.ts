import { model, Schema, Document } from 'mongoose';
import { Client } from '@interfaces/client.interface';

const clientSchema: Schema = new Schema({
    client_id: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    birthDate: {
        type: Date,
        required: false
    },
    favoriteProducts: {
        type: [String],
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },


})

export const ClientModel = model<Client & Document>('Client', clientSchema);