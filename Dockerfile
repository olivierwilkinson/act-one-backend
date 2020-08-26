FROM node:12

WORKDIR /app

COPY package*.json ./
COPY src src
COPY tsconfig.json tsconfig.json
COPY api.graphql api.graphql
COPY prisma prisma
COPY scripts scripts
COPY .env.default .env.default

RUN npm i --unsafe-perm
RUN npm run build

EXPOSE 8000

CMD npm run start
