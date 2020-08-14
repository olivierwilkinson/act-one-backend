import { PrismaClient } from '@prisma/client';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import BadRequest from '../errors/BadRequest';

export default (client: PrismaClient) =>
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: '/auth/google/callback',
    },
    (_, __, profile, done) => {
      const {
        emails: [{ value: email }] = [],
        id: googleId,
        displayName: name,
        photos: [{ value: picture }] = [],
      } = profile;
      if (!email) {
        done(new BadRequest('Email is required to create an account'));
        return;
      }

      client.user
        .upsert({
          create: {
            email,
            name,
            googleId,
            picture,
          },
          update: {
            googleId,
            picture,
            name,
          },
          where: {
            email,
          },
        })
        .then((user) => done(undefined, user))
        .catch(done);
    }
  );
