import { PrismaClient } from '@prisma/client';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

export default (client: PrismaClient) =>
  new LocalStrategy(
    {
      // use email over username
      usernameField: 'email',
      passwordField: 'password',
      session: true,
    },
    async (email, password, done) => {
      try {
        const normalisedEmail = email.toLowerCase();

        const existingUser = await client.user.findFirst({
          where: {
            email: normalisedEmail,
          },
        });

        if (existingUser) {
          return done(null, false, {
            message: 'User with that email already exists',
          });
        }

        // hash password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await client.user.create({
          data: {
            email: normalisedEmail,
            password: hashedPassword,
          },
        });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  );
