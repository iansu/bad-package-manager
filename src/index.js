import { parseArgs } from 'node:util';

import { installCommand } from './commands/install.js';
import { cleanCommand } from './commands/clean.js';

import { printUsage } from './lib/usage.js';

const main = async () => {
  const mainArgs = process.argv.slice(2);
  const options = {
    dev: {
      type: 'boolean',
      short: 'd',
    },
    silent: {
      type: 'boolean',
      short: 's',
    },
    verbose: {
      type: 'boolean',
      short: 'v',
    },
  };
  const defaults = {
    since: 'origin/main',
  };

  try {
    const { values, positionals } = parseArgs({ args: mainArgs, options, allowPositionals: true });
    const args = { ...defaults, ...values };

    if (positionals.length !== 1) {
      printUsage();
    }

    if (positionals[0] === 'install') {
      await installCommand(args);
    } else if (positionals[0] === 'clean') {
      await cleanCommand();
    }
  } catch (error) {
    console.error(error);

    printUsage();
  }
};

export { main };
