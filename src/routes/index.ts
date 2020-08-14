import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

import statusRouter from './status';
import authRouter from './auth';

export default (client: PrismaClient) => {
  const router = Router();

  router.use('/', statusRouter(client));
  router.use('/auth', authRouter());

  return router;
};
