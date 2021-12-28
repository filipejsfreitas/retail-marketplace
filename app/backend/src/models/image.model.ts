import { model, Schema, Document } from 'mongoose';
import { Image } from '@interfaces/image.interface';

const imageSchema: Schema = new Schema({
    path: {
        type: String,
        required:true
    }
})

export const ImageModel = model<Image & Document>('Image', imageSchema);