import path from 'path';
import fs from 'fs';

export const resolveMine = (dirOrFilePath: string) =>
	path.resolve(__dirname, '..', dirOrFilePath);

export const myRoot = resolveMine('.'); // node_modules/@guardian/scripts

export const theirRoot = path.resolve(myRoot, '..', '..', '..');
export const theirNodeModules = path.resolve(theirRoot, 'node_modules');
export const theirPackageJson = path.resolve(theirRoot, 'package.json');
export const theirCwd = fs.realpathSync(process.cwd());
