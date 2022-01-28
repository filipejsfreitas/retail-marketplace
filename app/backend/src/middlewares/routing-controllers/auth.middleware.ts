import { HttpException } from '../../exceptions/HttpException';
import passport from 'passport';
import { AuthorizationChecker } from 'routing-controllers/types/AuthorizationChecker';
import { RequestWithUser } from '../../interfaces/auth.interface';
import { NextFunction, Response } from 'express';
import { UserModel } from '../../models/users.model';

export const authMiddleware: AuthorizationChecker = (
  { request: req, response: res, next }: { request: RequestWithUser; response: Response; next: NextFunction },
  roles: string[],
) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, (err, user: null | UserModel, info) => {
      if (err) {
        return reject(new HttpException(401, 'Unauthorized'));
      }
      if (!user) {
        return reject(new HttpException(401, 'Unauthorized'));
      }

      req.user = user;

      // If the user requested roles, we check them
      if (roles && roles.length > 0) {
        if (!req.token) {
          return reject(new HttpException(401, 'Unauthorized'));
        }

        for (const role of roles) {
          if (role.toLowerCase() === 'admin' || role.toLowerCase() === 'administrator') {
            if (!req.token.clientInfo && !req.token.sellerInfo) {
              return resolve(true);
            }
          }

          if (role.toLowerCase() === 'seller') {
            if (req.token.sellerInfo) {
              return resolve(true);
            }
          }

          if (role.toLowerCase() === 'client') {
            if (req.token.clientInfo) {
              return resolve(true);
            }
          }
        }

        // If the user requested roles, and no roles matched, we reject
        return reject(new HttpException(401, 'Unauthorized'));
      }

      // If no roles were requested, we authorize
      return resolve(true);
    })(req, res, next);
  });
};
