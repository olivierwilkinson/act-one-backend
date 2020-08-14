import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

import statusRouter from './status';

export default (client: PrismaClient) => {
  const router = Router();

  router.use('/', statusRouter(client));

  return router;
};
