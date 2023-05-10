import { UsersRouter } from './resource/users/users-router.js';
import { SimpleServer } from './simple-server/simple-server.js';

export const simpleServer = new SimpleServer().register(UsersRouter);
