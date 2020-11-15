import { schema } from 'nexus';
import { intArg } from 'nexus/components/schema';

import createPlay from '../helpers/createPlay';
import userIsAdmin from '../helpers/userIsAdmin';

schema.objectType({
  name: 'Play',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.description();
    t.model.image();
    t.model.imageLicenseCode();
    t.model.imageLicenseUrl();
    t.model.scenes();
    t.model.publishedDate();
  },
});

schema.extendType({
  type: 'Query',
  definition(t) {
    t.crud.play();
    t.crud.plays();
  },
});

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createPlay', {
      type: 'Play',
      args: {
        play: schema.arg({
          type: 'PlayData',
          required: true,
        }),
      },
      async resolve(_, { play }, { db, user }) {
        if (!userIsAdmin(user)) {
          throw new Error('Access Denied');
        }

        return createPlay({ play, db });
      },
    });

    t.field('deletePlay', {
      type: 'Play',
      args: {
        id: intArg({ required: true }),
      },
      resolve(_, { id }, { db, user }) {
        if (!userIsAdmin(user)) {
          throw new Error('Access Denied');
        }

        return db.play.delete({
          where: { id },
        });
      },
    });
  },
});

schema.inputObjectType({
  name: 'PlayData',
  definition(t) {
    t.string('title', { required: true });
    t.string('description', { required: true });
    t.string('image', { required: true });
    t.string('imageLicenseCode', { required: true });
    t.string('imageLicenseUrl', { required: true });
    t.list.field('scenes', {
      type: 'SceneData',
      required: true,
    });
  },
});

schema.inputObjectType({
  name: 'SceneData',
  definition(t) {
    t.int('actNum', { required: true });
    t.int('sceneNum', { required: true });
    t.list.field('lines', {
      type: 'LineData',
      required: true,
    });
  },
});

schema.inputObjectType({
  name: 'LineData',
  definition(t) {
    t.string('player', { required: true });
    t.list.field('lineRows', {
      type: 'LineRowData',
      required: true,
    });
  },
});

schema.inputObjectType({
  name: 'LineRowData',
  definition(t) {
    t.string('text', { required: true });
    t.int('number', { nullable: true });
  },
});
