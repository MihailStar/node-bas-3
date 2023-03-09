import { createWebSocketStream, WebSocketServer } from 'ws';
import { configuration } from '../common/configuration.js';
import { handleError } from '../utility/handle-error.js';
import { comandToExecutor, isComand } from './comand-to-executor.js';

const { WS_PORT } = configuration;
const wsServer = new WebSocketServer({ port: WS_PORT }, () => {
  console.info('WebSocket server:', `ws://localhost:${WS_PORT}`);
});

wsServer.on('connection', (ws) => {
  ws.on('close', () => {
    console.info('Disconnected');
  });

  ws.on('error', handleError);

  const wsStream = createWebSocketStream(ws, {
    encoding: 'utf-8',
    decodeStrings: false,
  });

  wsStream.on('data', (message: string) => {
    const [command, ...args] = message.split(' ');

    if (!isComand(command)) {
      return;
    }

    const executor = comandToExecutor[command];

    if (args.length !== executor.length) {
      return;
    }

    console.info('Command:', message);

    executor.apply(wsStream, args).catch(handleError);
  });

  console.info('Connected');
});

export { wsServer };
