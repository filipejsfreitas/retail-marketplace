import { Document, model, Schema } from 'mongoose';
import { Image } from '../interfaces/image.interface';

const imageSchema: Schema = new Schema({
  path: {
    type: String,
    required: true,
  },
});

export type ImageModel = Image & Document;
export const ImageModel = model<ImageModel>('Image', imageSchema);
