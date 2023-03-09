import { dirname } from 'path';
import { getFilePath } from './get-file-path.js';

/**
 * @param fileUrl file url or `import.meta.url`
 * @returns `__dirname`
 */
export function getDirPath(fileUrl: string): string {
  /** `__filename` */
  const filePath = getFilePath(fileUrl);
  /** `__dirname` */
  const directoryPath = dirname(filePath);

  return directoryPath;
}
