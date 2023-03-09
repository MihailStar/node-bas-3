import cluster from 'cluster';
import { Message } from './message.js';

export class Storage<T> {
  private readonly key: string;
  private data: T[];
  private isPrimaryInitialized: boolean;

  /**
   * For cluster with primary strorage:
   * - create instance in primary part of cluster
   * - initialize IPC
   * @example
   * ```
   * new Storage<User>('users').initializePrimary();
   * ```
   */
  constructor(key: string) {
    this.key = key;
    this.data = [];
    this.isPrimaryInitialized = false;
  }

  initializePrimary(): void {
    if (cluster.isPrimary && !this.isPrimaryInitialized) {
      cluster.on('message', (worker, message) => {
        if (Message.isMessage<T>(message) && message.key === this.key) {
          if (message.data === null) {
            worker.send(new Message<T>(this.key, this.data));

            return;
          }

          this.data = message.data;
        }
      });

      this.isPrimaryInitialized = true;
    }
  }

  /**
   * @todo try rewriting from subscribe/unsubscribe to async iterator
   */
  get(): Promise<T[]> {
    if (cluster.isWorker) {
      return new Promise((resolve, reject) => {
        if (process.send === undefined) {
          reject(new Error('Worker spawned without IPC channel'));

          return;
        }

        const handlePrimaryMessage = (message: unknown): void => {
          if (Message.isMessage<T>(message) && message.data) {
            process.off('message', handlePrimaryMessage);

            resolve(message.data);
          }
        };

        process.on('message', handlePrimaryMessage);

        process.send(
          new Message<T>(this.key),
          undefined,
          undefined,
          (error) => {
            if (error instanceof Error) {
              reject(error);
            }
          }
        );
      });
    }

    return Promise.resolve(this.data);
  }

  set(data: T[]): Promise<void> {
    if (cluster.isWorker) {
      return new Promise((resolve, reject) => {
        if (process.send === undefined) {
          reject(new Error('Worker spawned without IPC channel'));

          return;
        }

        process.send(
          new Message<T>(this.key, data),
          undefined,
          undefined,
          (error) => {
            if (error instanceof Error) {
              reject(error);

              return;
            }

            resolve();
          }
        );
      });
    }

    this.data = data;

    return Promise.resolve();
  }
}
