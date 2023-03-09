import type { Worker } from 'cluster';
import cluster from 'cluster';
import { createServer, request } from 'http';
import { cpus } from 'os';
import { pipeline } from 'stream';
import { configuration } from './common/configuration.js';
import { HttpStatusCode } from './common/http-status-code.js';
import type { User } from './resource/users/users-model.js';
import { simpleServer } from './simple-server.js';
import { Storage } from './storage/storage.js';

if (cluster.isPrimary) {
  const workers: Worker[] = [];
  let currentWorkerIndex = 0;

  cluster.on('exit', (deadWorker) => {
    const deadWorkerIndex = workers.findIndex(
      (worker) => worker === deadWorker
    );
    const deadWorkerPort = configuration.PORT + deadWorkerIndex + 1;
    const deadWorkerPid = deadWorker.process.pid!;

    console.log(
      `✗ Worker. Port: ${deadWorkerPort}. Process Id: ${deadWorkerPid}`
    );

    const worker = cluster.fork({
      NODE_ENV: configuration.NODE_ENV,
      PORT: deadWorkerPort,
    });

    workers.splice(deadWorkerIndex, 1, worker);
  });

  cpus().forEach((_cpu, index) => {
    const workerPort = configuration.PORT + index + 1;

    const worker = cluster.fork({
      NODE_ENV: configuration.NODE_ENV,
      PORT: workerPort,
    });

    workers.push(worker);
  });

  createServer((incomingMessage, serverResponse) => {
    function handleError(error: Error): void {
      const statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR;

      serverResponse
        .writeHead(statusCode, {
          'Content-Type': 'application/json',
        })
        .end(
          JSON.stringify({
            data: null,
            reason: configuration.isDevelopment
              ? error.message
              : 'Internal server error',
            statusCode,
          })
        );
    }

    const currentWorkerPort = configuration.PORT + currentWorkerIndex + 1;
    const requestToWorker = request(
      {
        hostname: 'localhost',
        port: currentWorkerPort,
        path: incomingMessage.url,
        method: incomingMessage.method,
        headers: incomingMessage.headers,
      },
      (responseFromWorker) => {
        serverResponse.writeHead(responseFromWorker.statusCode!, {
          'X-Worker-Port': `${currentWorkerPort}`,
          ...responseFromWorker.headers,
        });

        pipeline(responseFromWorker, serverResponse, (error) => {
          if (error instanceof Error) {
            handleError(error);
          }
        });
      }
    );

    requestToWorker.on('error', (error) => {
      handleError(error);
    });

    pipeline(incomingMessage, requestToWorker, (error) => {
      if (error instanceof Error) {
        handleError(error);
      }
    });

    currentWorkerIndex = (currentWorkerIndex + 1) % workers.length;
  }).listen(configuration.PORT);

  new Storage<User>('users').initializePrimary();

  const serverPort = configuration.PORT;
  const serverPid = process.pid;

  console.log(`✓ Primary. Port: ${serverPort}. Process Id: ${serverPid}`);
  console.log(`  http://localhost:${serverPort}`);
} else {
  simpleServer.listen(configuration.PORT, () => {
    const workerPort = configuration.PORT;
    const workerPid = process.pid;

    console.log(`+ Worker. Port: ${workerPort}. Process Id: ${workerPid}`);
  });
}
