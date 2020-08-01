import bodyParser from 'body-parser';
import express from 'express';
import * as Sentry from '@sentry/node';
import strongErrorHandler from 'strong-error-handler';
import { PrismaClient } from '@prisma/client';

import routes from './routes';

const app = express();
const client = new PrismaClient();

Sentry.init({ dsn: process.env.SENTRY_DSN || '' });

app.set('port', process.env.PORT || 3000);
app.use(Sentry.Handlers.requestHandler());
app.use(bodyParser.json());
app.use(routes(client));
app.use(Sentry.Handlers.errorHandler());
app.use(
  strongErrorHandler({
    safeFields: ['message', 'code', 'details'],
  })
);

export default app;
