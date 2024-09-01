import { objectType, extendType } from '@nexus/schema';

export const Scene = objectType({
  name: 'Scene',
  definition(t) {
    t.model.id();
    t.model.actNum();
    t.model.sceneNum();
    t.model.playId();
    t.model.play();
    t.model.lines();
    t.model.index();
  },
});

export const SceneQueries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.scene();
  },
});
