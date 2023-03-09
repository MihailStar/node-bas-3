import { accessSync } from 'fs';
import { access } from 'fs/promises';

async function isExist(fileOrDirPath: string): Promise<boolean> {
  try {
    await access(fileOrDirPath);
    return true;
  } catch (error) {
    return false;
  }
}

function isExistSync(fileOrDirPath: string): boolean {
  try {
    accessSync(fileOrDirPath);
    return true;
  } catch (error) {
    return false;
  }
}

export { isExist, isExistSync };
