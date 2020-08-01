import bodyParser from 'body-parser';
import express from 'express';
import * as Sentry from '@sentry/node';
import strongErrorHandler from 'strong-error-handler';

import routes from './routes';

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN || '',
});

app.use(Sentry.Handlers.requestHandler());

app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);
app.use(routes());

app.use(Sentry.Handlers.errorHandler());

app.use(
  strongErrorHandler({
    safeFields: ['message', 'code', 'details'],
  })
);

export default app;
