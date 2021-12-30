/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExtractJwt, Strategy as PassportJwtStrategy } from 'passport-jwt';
import { UserModel } from '../../models/users.model';

export const AppJwtStrategy = new PassportJwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
    passReqToCallback: true,
  },
  (req, payload, done) => {
    req.token = payload;

    UserModel.findOne({ email: payload.email })
      .then(user => done(null, user))
      .catch(_ => done(null, false));
  },
);
