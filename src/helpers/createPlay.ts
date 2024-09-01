import { PrismaClient } from '@prisma/client';
import type { NexusGenInputs } from '../types/nexus-typegen';

export default async function createPlay({
  play: { scenes, ...playData },
  db,
}: {
  play: NexusGenInputs['PlayData'];
  db: PrismaClient;
}) {
  console.log('creating play:', playData);
  const play = await db.play.create({
    data: {
      ...playData,
      scenes: {
        create: scenes.map(({ lines, ...sceneData }, sceneIndex) => ({
          ...sceneData,
          index: sceneIndex,
          lines: {
            create: lines.map(({ lineRows, ...lineData }, lineIndex) => ({
              ...lineData,
              index: lineIndex,
              lineRows: {
                create: lineRows.map((lineRow, lineRowIndex) => ({
                  ...lineRow,
                  index: lineRowIndex,
                })),
              },
            })),
          },
        })),
      },
    },
  });
  console.log('Created play:', play);

  return play;
}
