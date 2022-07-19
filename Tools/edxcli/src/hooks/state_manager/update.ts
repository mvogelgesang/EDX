import { Hook } from '@oclif/core';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { retrieveFile } from './helper';

const hook: Hook<'state_manager:update'> = async function (
  options,
): Promise<void> {
  process.stdout.write('Removing item from list\n');
  const fileName = path.join(this.config.cacheDir, `${options.command}.json`);
  const data = await retrieveFile(fileName);
  data.shift();

  writeFileSync(fileName, JSON.stringify(data));
};

export default hook;
