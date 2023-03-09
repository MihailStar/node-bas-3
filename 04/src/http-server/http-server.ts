import { readFile } from 'fs/promises';
import { createServer } from 'http';
import { dirname, join, resolve } from 'path';
import { configuration } from '../common/configuration.js';
import { HttpStatusCode } from '../common/http-status-code.js';

const { HTTP_PORT } = configuration;
const httpServer = createServer((req, res) => {
  const filePath = join(
    resolve(dirname('')),
    // eslint-disable-next-line
    req.url === '/' ? '/front/index.html' : '/front' + req.url
  );

  readFile(filePath)
    .then((data) => {
      res.writeHead(HttpStatusCode.OK);
      res.end(data);
    })
    .catch(() => {
      res.writeHead(HttpStatusCode.NOT_FOUND);
      res.end();
    });
});

httpServer.listen(HTTP_PORT, () => {
  console.info('HTTP server:', `http://localhost:${HTTP_PORT}`);
});

export { httpServer };
