import { schema } from 'nexus';

schema.objectType({
  name: 'Line',
  definition(t) {
    t.model.id();
    t.model.player();
    t.model.scene();
    t.model.sceneId();
    t.model.lineRows();
  },
});
