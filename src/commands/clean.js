import { deleteNodeModules } from '../lib/clean.js';

const cleanCommand = async () => {
  return deleteNodeModules();
};

export { cleanCommand };
