import { objectType, extendType } from '@nexus/schema';

export const LineRow = objectType({
  name: 'LineRow',
  definition(t) {
    t.model.id();
    t.model.number();
    t.model.text();
    t.model.line();
    t.model.lineId();
  },
});

export const LineRowQueries = extendType({
  type: 'Query',
  definition(t) {
    t.crud.lineRow();
  },
});
