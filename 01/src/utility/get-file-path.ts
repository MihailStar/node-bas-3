import { fileURLToPath } from 'url';

/**
 * @param fileUrl file url or `import.meta.url`
 * @returns `__filename`
 */
export function getFilePath(fileUrl: string): string {
  /** `__filename` */
  const filePath = fileURLToPath(fileUrl);

  return filePath;
}
