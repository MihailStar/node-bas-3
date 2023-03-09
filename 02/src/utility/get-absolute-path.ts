import { isAbsolute, join } from 'path';

/**
 * relative to Сurrent Working Dir
 */
function getAbsolutePath(path: string): string {
  if (isAbsolute(path)) {
    return path;
  }

  const currentWorkingDir = process.cwd();
  const absolutePath = join(currentWorkingDir, path);

  return absolutePath;
}

export { getAbsolutePath };
