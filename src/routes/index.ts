import { Router } from 'express';

import { version } from '../../package.json';
import ApplicationError from '../errors/ApplicationError';

export default () => {
  const router = Router();

  router.get('/', (_, res) => res.json({ version }));
  router.get('/status', (_, res) => res.sendStatus(200));
  router.get('/ready', (_, res) => res.sendStatus(200));
  router.get('/live', (_, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
      return next(
        new ApplicationError(
          'NODE_ENV is not set to production.',
          400,
          'NODE_ENV_INCORRECT'
        )
      );
    }

    const vars = Object.getOwnPropertyNames(process.env);
    const expected = ['SENTRY_DSN'];

    const missing = expected.filter((envVar) => !vars.includes(envVar));
    if (missing.length !== 0) {
      return next(
        new ApplicationError(
          'Environment variables are not set',
          500,
          'UNSET_ENV_VARS',
          {
            missing,
          }
        )
      );
    }

    return res.sendStatus(200);
  });
  router.use((_, res) => res.sendStatus(404));

  return router;
};
