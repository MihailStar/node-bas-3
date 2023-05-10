import { constants } from 'fs';
import { access } from 'fs/promises';

export async function isFileExist(filePath: string): Promise<boolean> {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}
