import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import strongErrorHandler from 'strong-error-handler';
import * as Sentry from '@sentry/node';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import expressWinston from 'express-winston';
import winston from 'winston';

import client from '../prisma/client';
import routes from './routes';
import {
  createGoogleStrategy,
  createLocalLoginStrategy,
  createLocalSignupStrategy,
} from './passport';

// whitelist body for logging
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

Sentry.init({ dsn: process.env.SENTRY_DSN || '' });

const app = express();

// setup session middleware
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

// setup sentry
app.use(Sentry.Handlers.requestHandler());

// setup body parser
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

// setup passport
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

// setup winston logging
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    colorize: true,
    requestFilter: (req, propName) => {
      if (propName === 'body') {
        if (req.url.includes('/login')) {
          return {
            ...req.body,
            password: '****',
          };
        }
        if (req.url.includes('/signup')) {
          return {
            ...req.body,
            password: '****',
          };
        }
      }

      return req[propName];
    },
  })
);

app.use(routes(client));

app.use(Sentry.Handlers.errorHandler());
app.use(
  strongErrorHandler({
    safeFields: ['message', 'code', 'details'],
  })
);

export default app;
