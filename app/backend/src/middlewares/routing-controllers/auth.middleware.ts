import { HttpException } from '../../exceptions/HttpException';
import passport from 'passport';
import { AuthorizationChecker } from 'routing-controllers/types/AuthorizationChecker';
import { Action } from 'routing-controllers';

export const authMiddleware: AuthorizationChecker = ({ request: req, response: res, next }: Action, roles: any[]) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        return reject(new HttpException(401, 'Unauthorized'));
      }
      if (!user) {
        return reject(new HttpException(401, 'Unauthorized'));
      }

      req.user = user;

      return resolve(true);
    })(req, res, next);
  });
};
