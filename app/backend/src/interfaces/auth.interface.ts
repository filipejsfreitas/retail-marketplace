import { Request } from 'express';
import { UserModel } from '../models/users.model';
import { ClientModel } from '../models/client.model';
import { SellerModel } from '../models/seller.model';

export interface JwtTokenPayload {
  _id: string;
  email: string;

  clientInfo?: {
    firstName: string;
    lastName: string;
  };

  sellerInfo?: {
    firstName: string;
    lastName: string;
  };

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
  client?: ClientModel;
  seller?: SellerModel;
  token?: JwtTokenPayload;
}
