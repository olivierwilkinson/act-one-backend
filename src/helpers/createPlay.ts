import { PrismaClient } from '@prisma/client';

export default async function createPlay({
  play: { scenes, ...playData },
  db,
}: {
  play: any;
  db: PrismaClient;
}) {
  const play = await db.play.create({
    data: playData,
  });

  await Promise.all(
    (scenes || []).map(async ({ lines, ...sceneData }: any) => {
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
        lines.map(async ({ lineRows, ...lineData }: any) => {
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
            lineRows.map(async (lineRow: any) => {
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
