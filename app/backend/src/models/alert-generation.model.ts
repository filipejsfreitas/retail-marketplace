import { AlertGeneration } from '../interfaces/alert-generation.interface';
import { Document, model, Schema } from 'mongoose';

const alertGenerationSchema: Schema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export type AlertGenerationModel = AlertGeneration & Document;
export const AlertGenerationModel = model<AlertGenerationModel>('AlertGeneration', alertGenerationSchema);
