import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

import { version } from '../../package.json';
import ApplicationError from '../errors/ApplicationError';

export default (client: PrismaClient) => {
  const router = Router();

  router.get('/', (_, res) => res.json({ version }));
  router.get('/status', (_, res) => res.sendStatus(200));
  router.get('/ready', async (_, res, next) => {
    try {
      await client.user.count();
      res.sendStatus(200);
    } catch (e) {
      next(new ApplicationError('Unable to access db'));
    }
  });
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
