import { Hook } from '@oclif/core';
import path from 'node:path';
import { retrieveFile } from './helper';

const hook: Hook<'state_manager:retrieve'> = async function (
  options,
): Promise<string[]> {
  const fileName = path.join(this.config.cacheDir, `${options.command}.json`);
  return retrieveFile(fileName);
};

export default hook;
