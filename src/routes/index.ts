import { Router } from 'express';
import { PrismaClient } from 'nexus-plugin-prisma/client';
import { createProxyMiddleware } from 'http-proxy-middleware';

import statusRouter from './status';
import authRouter from './auth';

export default (client: PrismaClient) => {
  const router = Router();

  router.use('/', statusRouter(client));
  router.use('/auth', authRouter());
  router.use(
    '/public',
    createProxyMiddleware({
      target: `https://storage.cloud.google.com/actone-recordings`,
      changeOrigin: true,
    })
  );

  return router;
};
