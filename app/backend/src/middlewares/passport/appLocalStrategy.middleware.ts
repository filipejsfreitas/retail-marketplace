/* eslint-disable @typescript-eslint/no-unused-vars */
import { Strategy as PassportLocalStrategy } from 'passport-local';
import { UserModel } from '../../models/users.model';
import { verifyUserPassword } from './verifyUserPassword';

export const AppLocalStrategy = new PassportLocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
  UserModel.findOne({ email })
    .then(verifyUserPassword(password, done))
    .catch(_ => done(null, false));
});
