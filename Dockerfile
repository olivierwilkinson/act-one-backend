FROM node:12

COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build
EXPOSE 8000

CMD npm run start
