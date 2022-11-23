import { ESLint } from 'eslint';

export async function lintCommand(): Promise<string> {
	const eslint = new ESLint({
		extensions: ['.ts'],
		baseConfig: {
			extends: ['@guardian/eslint-config-typescript'],
		},
		errorOnUnmatchedPattern: false,
	});

	const results = await eslint.lintFiles(['src/**']);
	const formatter = await eslint.loadFormatter('stylish');
	return formatter.format(results);
}
