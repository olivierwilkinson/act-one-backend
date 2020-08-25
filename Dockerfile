FROM node:12

COPY package*.json ./
COPY src src
copy prisma prisma
copy tsconfig.json tsconfig.json

RUN npm i
RUN npm run build

EXPOSE 8000

CMD npm run start
