import { configuration } from './common/configuration.js';
import { simpleServer } from './simple-server.js';

simpleServer.listen(configuration.PORT, () => {
  const serverPort = configuration.PORT;
  const serverPid = process.pid;

  console.log(`✓ Server. Port: ${serverPort}. Process Id: ${serverPid}`);
  console.log(`  http://localhost:${serverPort}`);
});

process.on('SIGINT', () => {
  simpleServer.close();
});
