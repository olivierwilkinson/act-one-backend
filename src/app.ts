import { use, server, settings } from 'nexus';
import { prisma } from 'nexus-plugin-prisma';
import { PrismaClient } from 'nexus-plugin-prisma/client';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import strongErrorHandler from 'strong-error-handler';
import * as Sentry from '@sentry/node';
import dotenv from 'dotenv';

import routes from './routes';
import { createGoogleStrategy } from './passport';

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env.default' });
}

const client = new PrismaClient();
use(prisma({ client: { instance: client } }));
const { express: app } = server;

settings.change({
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8000,
  },
});

Sentry.init({ dsn: process.env.SENTRY_DSN || '' });

app.use(
  session({
    secret: process.env.SESSION_SECRET || '123',
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
    },
    proxy: true,
  })
);

app.use(Sentry.Handlers.requestHandler());
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
passport.use(createGoogleStrategy(client));
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(routes(client));

app.use(Sentry.Handlers.errorHandler());
app.use(
  strongErrorHandler({
    safeFields: ['message', 'code', 'details'],
  })
);

export default app;
