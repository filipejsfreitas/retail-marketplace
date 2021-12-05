import { model, Schema, Document } from 'mongoose';
import { Category } from '../interfaces/category.interface';

const categorySchema: Schema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    parent_id: {
      type: String,
      required: false,
    },
    level: {
      type: Number,
      required: true,
    }
  });

  export const CategoryModel = model<Category & Document>('Category', categorySchema);
