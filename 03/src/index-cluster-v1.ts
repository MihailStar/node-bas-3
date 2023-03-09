import type { Worker } from 'cluster';
import cluster from 'cluster';
import { cpus } from 'os';
import { configuration } from './common/configuration.js';
import type { User } from './resource/users/users-model.js';
import { simpleServer } from './simple-server.js';
import { Storage } from './storage/storage.js';

declare module 'cluster' {
  interface ClusterSettings {
    serialization?: 'json' | 'advanced';
  }
}

if (cluster.isPrimary) {
  cluster.schedulingPolicy = cluster.SCHED_RR;

  const workerToWorkerPort: Map<Worker, typeof configuration['PORT']> =
    new Map();

  cluster.on('exit', (deadWorker) => {
    const deadWorkerPort = workerToWorkerPort.get(deadWorker)!;
    const deadWorkerPid = deadWorker.process.pid!;

    console.log(
      `✗ Worker. Port: ${deadWorkerPort}. Process Id: ${deadWorkerPid}`
    );

    const worker = cluster.fork({
      NODE_ENV: configuration.NODE_ENV,
      PRIMARY_PORT: configuration.PORT,
      PORT: deadWorkerPort,
    });

    workerToWorkerPort.set(worker, deadWorkerPort).delete(deadWorker);
  });

  cpus().forEach((_cpu, index) => {
    const workerPort = configuration.PORT + index + 1;

    const worker = cluster.fork({
      NODE_ENV: configuration.NODE_ENV,
      PRIMARY_PORT: configuration.PORT,
      PORT: workerPort,
    });

    workerToWorkerPort.set(worker, workerPort);
  });

  new Storage<User>('users').initializePrimary();

  const primaryPort = configuration.PORT;
  const primaryPid = process.pid;

  console.log(`✓ Primary. Port: ${primaryPort}. Process Id: ${primaryPid}`);
  console.log(`  http://localhost:${primaryPort}`);
} else {
  if (process.env['PRIMARY_PORT']) {
    simpleServer.listen(+process.env['PRIMARY_PORT']);
  }

  simpleServer.listen(configuration.PORT, () => {
    const workerPort = configuration.PORT;
    const workerPid = process.pid;

    console.log(`✓ Worker. Port: ${workerPort}. Process Id: ${workerPid}`);
  });
}
