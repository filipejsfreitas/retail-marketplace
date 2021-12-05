import { Request } from 'express';
import { UserModel } from '../models/users.model';

export interface JwtTokenPayload {
  _id: string;
  email: string;

  jti: string;
  aud: string;
  iss: string;

  iat?: number;
  exp?: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user?: UserModel;
  token?: JwtTokenPayload;
}
