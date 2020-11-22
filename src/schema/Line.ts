import { objectType, extendType } from '@nexus/schema';

export const Line = objectType({
  name: 'Line',
  definition(t) {
    t.model.id();
    t.model.player();
    t.model.scene();
    t.model.sceneId();
    t.model.lineRows();
  },
});

export const LineQueries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.line();
  },
});
