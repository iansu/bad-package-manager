import fs from 'fs/promises';
import path from 'path';

import { debug } from '../lib/debug.js';

const getPackageJson = async () => {
  try {
    const pkg = await fs.readFile(path.join(process.cwd(), 'package.json'), 'utf8');

    return JSON.parse(pkg);
  } catch {
    console.error('Unable to read package.json');

    process.exit(1);
  }
};

const getDependencies = async () => {
  try {
    const pkg = await fs.readFile(path.join(process.cwd(), 'package.json'), 'utf8');
    const pkgJson = JSON.parse(pkg);

    const dependencies = {
      ...pkgJson.devDependencies,
      ...pkgJson.dependencies,
    };

    debug('dependencies', dependencies);

    return dependencies;
  } catch (error) {
    console.error('Unable to read package.json', error);
  }
};

const isInstalled = async (name) => {
  const pkg = await getPackageJson();

  return Object.keys(pkg.dependencies).includes(name) || Object.keys(pkg.devDependencies).includes(name);
};

export { getPackageJson, getDependencies, isInstalled };
