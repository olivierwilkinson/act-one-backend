import { schema } from 'nexus';

schema.objectType({
  name: 'Scene',
  definition(t) {
    t.model.id();
    t.model.actNum();
    t.model.sceneNum();
    t.model.playId();
    t.model.play();
    t.model.lines();
  },
});

schema.extendType({
  type: 'Query',
  definition(t) {
    t.crud.scene();
  },
});
