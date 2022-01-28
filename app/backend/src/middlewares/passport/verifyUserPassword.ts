import bcrypt from 'bcrypt';
import { VerifiedCallback } from 'passport-jwt';

export function verifyUserPassword(password, done: VerifiedCallback) {
  return user => {
    if (!user) return done(null, false, { message: 'Incorrect username/password.' });

    bcrypt
      .compare(password, user.password)
      .then(isPasswordCorrect => {
        if (!isPasswordCorrect) return done(null, false, { message: 'Incorrect username/password.' });

        return done(null, user);
      })
      .catch(_ => done(null, false, { message: 'Incorrect username/password.' }));
  };
}
