import { Hook } from '@oclif/core';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const hook: Hook<'state_manager:create'> = async function (
  options,
): Promise<void> {
  process.stdout.write('Caching the list\n');
  process.stdout.write(this.config.cacheDir);
  const filePath = path.join(this.config.cacheDir, `${options.command}.json`);
  if (!existsSync(this.config.cacheDir)) {
    mkdirSync(this.config.cacheDir);
  }

  writeFileSync(filePath, JSON.stringify(options.data));
};

export default hook;
