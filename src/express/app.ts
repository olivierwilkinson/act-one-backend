import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import strongErrorHandler from 'strong-error-handler';
import * as Sentry from '@sentry/node';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

import client from '../prisma/client';
import routes from './routes';
import {
  createGoogleStrategy,
  createLocalLoginStrategy,
  createLocalSignupStrategy,
} from './passport';

Sentry.init({ dsn: process.env.SENTRY_DSN || '' });

const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET || '123',
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
    },
    proxy: true,
    store: new PrismaSessionStore(client, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
    }),
  })
);

app.use(Sentry.Handlers.requestHandler());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(createGoogleStrategy(client));
passport.use('login', createLocalLoginStrategy(client));
passport.use('signup', createLocalSignupStrategy(client));
passport.serializeUser((user, done) =>
  process.nextTick(() => done(null, user))
);
passport.deserializeUser((user, done) =>
  process.nextTick(() => done(null, user))
);

app.use(routes(client));

app.use(Sentry.Handlers.errorHandler());
app.use(
  strongErrorHandler({
    safeFields: ['message', 'code', 'details'],
  })
);

export default app;
