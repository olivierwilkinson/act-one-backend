/* eslint-disable import/first */

import dotenv from 'dotenv';
import http from 'http';

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env.default' });
}

import app from './express/app';
import apolloServer from './apollo/server';
import config from './config';

apolloServer.applyMiddleware({ app, bodyParserConfig: false });

http.createServer(app).listen(config.port, () => {
  console.log(
    '\x1b[36m%s\x1b[0m', // eslint-disable-line
    `🌏 Express server started at http://localhost:${config.port}`
  );
});

process.on('SIGINT', () => {
  console.log('Gracefully shutting down');
  process.exit(0);
});
