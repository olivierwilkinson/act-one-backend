import { schema } from 'nexus';

schema.objectType({
  name: 'User',
  definition(t) {
    t.id('id');
    t.string('email');
    t.string('displayName');
    t.string('name', { nullable: true });
    t.string('picture', { nullable: true });
    t.string('googleId', { nullable: true });
  },
});

schema.queryType({
  definition(t) {
    t.field('user', {
      type: 'User',
      resolve(_, __, ctx) {
        if (!ctx.user) {
          return null;
        }

        return ctx.db.user.findOne({
          where: { id: ctx.user.id },
        });
      },
    });
  },
});
