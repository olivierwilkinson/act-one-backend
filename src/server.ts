/* eslint-disable import/first */
import dotenv from 'dotenv';
import http from 'http';

const result = dotenv.config();
if (result.error) {
  dotenv.config({ path: '.env.default' });
}

import app from './app';

http.createServer(app).listen(app.get('port'), () => {
  console.log(
    '\x1b[36m%s\x1b[0m', // eslint-disable-line
    `🌏 Express server started at http://localhost:${app.get('port')}`
  );
});

process.on('SIGINT', () => {
  console.log('Gracefully shutting down');
  process.exit(0);
});
