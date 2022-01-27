import { Document, model, Schema } from 'mongoose';
import { Alert } from '../interfaces/alert.interface';

const alertSchema: Schema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  dismissed: {
    type: Boolean,
    required: true,
  },
});

export type AlertModel = Alert & Document;
export const AlertModel = model<AlertModel>('Alert', alertSchema);
