import fs from 'node:fs/promises';
import path from 'node:path';

import { debug } from '../lib/debug.js';

const deleteNodeModules = async () => {
  debug('deleting node_modules', path.join(process.cwd(), 'node_modules'));

  return fs.rm(path.join(process.cwd(), 'node_modules'), { recursive: true, force: true });
};

export { deleteNodeModules };
