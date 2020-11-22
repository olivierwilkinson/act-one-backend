import { PrismaClient, User } from '@prisma/client';
import client from '../prisma/client';

export type Context = {
  db: PrismaClient;
  user?: User;
};

export const createContext = ({ req }: { req: { user?: User } }) => ({
  user: req.user,
  db: client,
});
