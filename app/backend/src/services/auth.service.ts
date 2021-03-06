import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Singleton } from 'typescript-ioc';
import { CreateClientWithUserDto, CreateSellerWithUserDto } from '../dtos/users.dto';
import { HttpException } from '../exceptions/HttpException';
import { JwtTokenPayload, TokenData } from '../interfaces/auth.interface';
import { User } from '../interfaces/users.interface';
import { UserModel } from '../models/users.model';
import { isEmpty } from '../utils/util';
import { nanoid } from 'nanoid';
import { ClientModel } from '../models/client.model';
import { SellerModel } from '../models/seller.model';

@Singleton
export class AuthService {
  public async signup(userData: CreateClientWithUserDto | CreateSellerWithUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const user: User = await UserModel.findOne({ email: userData.email });
    if (user) throw new HttpException(409, `Your email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return await UserModel.create({ ...userData, password: hashedPassword });
  }

  public async logout(user: UserModel, token: JwtTokenPayload): Promise<void> {
    user.invalidTokens.push(token.jti);

    await user.save();
  }

  public createToken(user: UserModel, client?: ClientModel, seller?: SellerModel): TokenData {
    const dataStoredInToken: JwtTokenPayload = {
      _id: user._id,
      email: user.email,

      clientInfo: client
        ? {
            firstName: client.firstName,
            lastName: client.lastName,
          }
        : null,

      sellerInfo: seller
        ? {
            firstName: seller.firstName,
            lastName: seller.lastName,
          }
        : null,

      jti: nanoid(16),
      aud: process.env.JWT_AUDIENCE,
      iss: process.env.JWT_ISSUER,
    };

    const secretKey: string = process.env.SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
}
