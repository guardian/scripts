import path from 'path';
import fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());

const resolvePath = (dirOrFilePath: string) =>
	path.resolve(appDirectory, dirOrFilePath);

export const nodeModules = resolvePath('node_modules');
