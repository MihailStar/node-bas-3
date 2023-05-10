import { httpServer } from './http-server/http-server.js';
import { wsServer } from './ws-server/ws-server.js';

process.on('SIGINT', () => {
  httpServer.close();

  wsServer.clients.forEach((ws) => ws.close());
  wsServer.close();
});
