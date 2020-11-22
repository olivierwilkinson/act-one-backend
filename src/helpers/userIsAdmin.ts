import { User } from '@prisma/client';

const admins = ['olivier.wilkinson@gmail.com'];

export default (user?: User) =>
  !!user && user.email && admins.includes(user.email);
