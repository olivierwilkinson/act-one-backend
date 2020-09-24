import nexus from 'nexus';
import { prisma } from 'nexus-plugin-prisma';
import { PrismaClient } from 'nexus-plugin-prisma/client';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import strongErrorHandler from 'strong-error-handler';
import * as Sentry from '@sentry/node';
import dotenv from 'dotenv';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

import routes from './routes';
import { createGoogleStrategy } from './passport';

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env.default' });
}

const client = new PrismaClient();
nexus.use(prisma({ client: { instance: client } }));
const { express } = nexus.server;

nexus.settings.change({
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8000,
  },
});

Sentry.init({ dsn: process.env.SENTRY_DSN || '' });

express.use(
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

express.use(Sentry.Handlers.requestHandler());
express.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
express.use(bodyParser.json({ limit: '50mb' }));

express.use(passport.initialize());
express.use(passport.session());
passport.use(createGoogleStrategy(client));
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

express.use(({ user }, _, next) => {
  nexus.schema.addToContext(() => ({ user }));
  next();
});

express.use(routes(client));

express.use(Sentry.Handlers.errorHandler());
express.use(
  strongErrorHandler({
    safeFields: ['message', 'code', 'details'],
  })
);

export default express;
