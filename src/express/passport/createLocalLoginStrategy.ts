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

        const user = await client.user.findFirst({
          where: {
            email: normalisedEmail,
          },
        });

        if (!user) {
          return done(null, false, {
            message: 'User with that email not found',
          });
        }

        // Check if user only has social login
        if (!user.password) {
          return done(null, false, { message: 'User only has social login' });
        }

        // Compare the provided password with the
        // hashed password in the database
        const passwordsMatch = await bcrypt.compare(password, user.password);

        // If the passwords match, return the user object
        if (!passwordsMatch) {
          return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  );
