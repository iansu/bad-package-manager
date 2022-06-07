import fs from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';
import tar from 'tar';

import { debug } from '../lib/debug.js';
import { deleteNodeModules } from '../lib/clean.js';

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

const installDependencies = async () => {
  const dependencies = await getDependencies();

  for (let [name, version] of Object.entries(dependencies)) {
    if (version.startsWith('^') || version.startsWith('~')) {
      version = version.slice(1);
    }

    const response = await fetch(`https://registry.npmjs.org/${name}/${version}`);

    if (response.ok) {
      const packument = await response.json();

      debug('tarball', packument.dist.tarball);

      fs.mkdir(path.join(process.cwd(), 'node_modules', name));

      // download and unpack tarball
      const tarballResponse = await fetch(packument.dist.tarball);
      // const tarball = tarballResponse.body.pipeThrough(new DecompressionStream('gzip'));
      // await Readable.fromWeb(tarball).pipe(fileStream);

      await Readable.fromWeb(tarballResponse.body).pipe(
        tar.x({
          strip: 1,
          cwd: path.join(process.cwd(), 'node_modules', name),
        })
      );
    }
  }
};

const installCommand = async () => {
  await deleteNodeModules();
  await fs.mkdir(path.join(process.cwd(), 'node_modules'));

  try {
    await installDependencies();
  } catch (error) {
    console.error(`Install error: ${error}`)
  }
};

export { installCommand };
