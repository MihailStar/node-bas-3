import { ParseUUIDPipe } from '@nestjs/common';
import { UUID_VERSION } from './uuid-version';

export const validateUuidPipe = new ParseUUIDPipe({
  version: UUID_VERSION,
});
