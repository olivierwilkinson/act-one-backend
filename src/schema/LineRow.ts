import { schema } from 'nexus';

schema.objectType({
  name: 'LineRow',
  definition(t) {
    t.model.id();
    t.model.number();
    t.model.text();
    t.model.line();
    t.model.lineId();
  },
});
