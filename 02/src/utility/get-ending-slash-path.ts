import { posix, win32 } from 'path';

function getEndingSlashPath(path: string): string {
  // Windows works with both slashes
  const pathWithEndingSlash =
    path.endsWith(win32.sep) || path.endsWith(posix.sep)
      ? path
      : `${path}${posix.sep}`;

  return pathWithEndingSlash;
}

export { getEndingSlashPath };
