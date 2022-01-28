import { NextFunction, Response } from 'express';
import { Authorized, Body, HttpCode, JsonController, Post, Req, Res, UseBefore } from 'routing-controllers';
import { CreateClientWithUserDto, CreateSellerWithUserDto, LoginUserDto } from '../dtos/users.dto';
import { User } from '../interfaces/users.interface';
import { validationMiddleware } from '../middlewares/express/validation.middleware';
import { AuthService } from '../services/auth.service';
import { Inject, Singleton } from 'typescript-ioc';
import passport from 'passport';
import { RequestWithUser } from '../interfaces/auth.interface';
import { HttpException } from '../exceptions/HttpException';
import { UserModel } from '../models/users.model';
import { ClientService } from '../services/client.service';
import { SellerService } from '../services/seller.service';
import { ClientModel } from '../models/client.model';
import { SellerModel } from '../models/seller.model';

@Singleton
@JsonController('/auth')
export class AuthController {
  @Inject
  public authService: AuthService;

  @Inject
  public clientService: ClientService;

  @Inject
  public sellerService: SellerService;

  @Post('/register')
  @UseBefore(validationMiddleware(CreateClientWithUserDto, 'body'))
  @HttpCode(201)
  async register(@Body() userData: CreateClientWithUserDto) {
    const signUpUserData: User = await this.authService.signup(userData);

    await this.clientService.createClient(
      {
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
      signUpUserData._id,
    );

    return { data: signUpUserData, message: 'signup' };
  }

  @Post('/register/client')
  @UseBefore(validationMiddleware(CreateClientWithUserDto, 'body'))
  @HttpCode(201)
  async registerClient(@Body() userData: CreateClientWithUserDto) {
    const signUpUserData: User = await this.authService.signup(userData);

    await this.clientService.createClient(
      {
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
      signUpUserData._id,
    );

    return { data: signUpUserData, message: 'signup' };
  }

  @Post('/register/seller')
  @UseBefore(validationMiddleware(CreateSellerWithUserDto, 'body'))
  @HttpCode(201)
  async registerSeller(@Body() sellerData: CreateSellerWithUserDto) {
    const signUpUserData: User = await this.authService.signup(sellerData);
    await this.sellerService.createSeller(sellerData, signUpUserData._id);

    return { data: signUpUserData, message: 'signup' };
  }

  @Post('/login')
  @UseBefore(validationMiddleware(LoginUserDto, 'body'))
  login(@Req() req: RequestWithUser, @Body() body: LoginUserDto, @Res() res: Response, next: NextFunction) {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', (err, user, info) => {
        if (err || !user) return reject(new HttpException(401, 'Incorrect username/password.'));

        Promise.all([this.clientService.getClient(user._id), this.sellerService.getSeller(user._id)]).then(
          ([client, seller]: [ClientModel?, SellerModel?]) => {
            const tokenData = this.authService.createToken(user, client, seller);

            resolve(tokenData);
          },
        );
      })(req, res, next);
    });
  }

  @Post('/logout')
  @Authorized()
  @HttpCode(204)
  async logout(@Req() req: RequestWithUser) {
    const user: UserModel = req.user;
    await this.authService.logout(user, req.token);
    return null;
  }
}
