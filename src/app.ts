import bodyParser from 'body-parser';
import express from 'express';
import * as Sentry from '@sentry/node';
import strongErrorHandler from 'strong-error-handler';
import session from 'express-session';
import { PrismaClient } from '@prisma/client';
import passport from 'passport';

import routes from './routes';
import { createGoogleStrategy } from './passport';

const app = express();
const client = new PrismaClient();

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
