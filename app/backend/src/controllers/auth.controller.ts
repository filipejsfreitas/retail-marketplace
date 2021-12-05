import { NextFunction, Response } from 'express';
import { Authorized, Body, HttpCode, JsonController, Post, Req, Res, UseBefore } from 'routing-controllers';
import { CreateUserDto, LoginUserDto } from '../dtos/users.dto';
import { User } from '../interfaces/users.interface';
import { validationMiddleware } from '../middlewares/express/validation.middleware';
import { AuthService } from '../services/auth.service';
import { Inject, Singleton } from 'typescript-ioc';
import passport from 'passport';
import { RequestWithUser } from '../interfaces/auth.interface';
import { HttpException } from '../exceptions/HttpException';
import { UserModel } from '../models/users.model';

@Singleton
@JsonController('/auth')
export class AuthController {
  @Inject
  public authService: AuthService;

  @Post('/register')
  @UseBefore(validationMiddleware(CreateUserDto, 'body'))
  @HttpCode(201)
  async register(@Body() userData: CreateUserDto) {
    const signUpUserData: User = await this.authService.signup(userData);

    return { data: signUpUserData, message: 'signup' };
  }

  @Post('/login')
  @UseBefore(validationMiddleware(LoginUserDto, 'body'))
  login(@Req() req: RequestWithUser, @Body() body: LoginUserDto, @Res() res: Response, next: NextFunction) {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', (err, user, info) => {
        if (err || !user) return reject(new HttpException(401, 'Incorrect username/password.'));

        const tokenData = this.authService.createToken(user);

        resolve(tokenData);
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
