import { makeSchema } from '@nexus/schema';
import { nexusPrisma } from 'nexus-plugin-prisma';
import * as path from 'path';

import * as Line from './Line';
import * as LineRow from './LineRow';
import * as Play from './Play';
import * as Scene from './Scene';
import * as User from './User';

export default makeSchema({
  types: {
    ...Line,
    ...LineRow,
    ...Play,
    ...Scene,
    ...User,
  },
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
      prismaClient: (ctx) => ctx.db,
    }),
  ],
  outputs: {
    typegen: path.join(
      __dirname,
      '../../node_modules/@types/nexus-typegen/index.d.ts'
    ),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '.prisma/client',
        alias: 'db',
      },
      {
        source: require.resolve('../apollo/context'),
        alias: 'Context',
      },
    ],
  },
});
