import { existsSync, readFileSync } from 'node:fs';

export const retrieveFile = async (fileName: string): Promise<string[]> => {
  if (!existsSync(fileName)) {
    return JSON.parse('[]');
  }

  return JSON.parse(readFileSync(fileName, { encoding: 'utf-8' }));
};
