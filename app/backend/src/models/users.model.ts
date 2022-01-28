import { Document, model, Schema } from 'mongoose';
import { User } from '../interfaces/users.interface';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  invalidTokens: {
    type: [String],
    required: true,
  },
});

export type UserModel = User & Document;
export const UserModel = model<UserModel>('User', userSchema);
