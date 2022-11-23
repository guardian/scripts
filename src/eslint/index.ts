import { ESLint } from 'eslint';
import { eslintConfig } from './config';

export interface EslintCommandProps {
	files: string[];
}

export async function eslintCommand(
	props: EslintCommandProps,
): Promise<string> {
	const { files } = props;

	console.log(`linting files matching: ${files.join(', ')}`);

	const eslint = new ESLint(eslintConfig);

	const results = await eslint.lintFiles(files);
	const formatter = await eslint.loadFormatter('stylish');
	return formatter.format(results);
}
