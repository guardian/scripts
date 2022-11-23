import { ESLint } from 'eslint';

export interface LintCommandProps {
	files: string[];
}

export async function lintCommand(props: LintCommandProps): Promise<string> {
	const { files } = props;

	console.log(`linting files matching: ${files.join(', ')}`);

	const eslint = new ESLint({
		extensions: ['.ts'],
		baseConfig: {
			extends: ['@guardian/eslint-config-typescript'],
			ignorePatterns: ['__snapshots__'],
		},
		errorOnUnmatchedPattern: false,
	});

	const results = await eslint.lintFiles(files);
	const formatter = await eslint.loadFormatter('stylish');
	return formatter.format(results);
}
