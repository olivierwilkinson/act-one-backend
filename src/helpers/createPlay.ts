import { PrismaClient } from 'nexus-plugin-prisma/client';
import { FieldResolver } from 'nexus/components/schema';

export default async function createPlay({
  play: { scenes, ...playData },
  db,
}: {
  play: Parameters<FieldResolver<'Mutation', 'createPlay'>>[1]['play'];
  db: PrismaClient;
}) {
  const play = await db.play.create({
    data: playData,
  });

  await Promise.all(
    (scenes || []).map(async ({ lines, ...sceneData }) => {
      const scene = await db.scene.create({
        data: {
          ...sceneData,
          play: {
            connect: {
              id: play.id,
            },
          },
        },
      });

      return Promise.all(
        lines.map(async ({ lineRows, ...lineData }) => {
          const line = await db.line.create({
            data: {
              ...lineData,
              scene: {
                connect: {
                  id: scene.id,
                },
              },
            },
          });

          return Promise.all(
            lineRows.map(async (lineRow) => {
              return db.lineRow.create({
                data: {
                  ...lineRow,
                  line: {
                    connect: {
                      id: line.id,
                    },
                  },
                },
              });
            })
          );
        })
      );
    })
  );

  return play;
}
