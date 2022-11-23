import { ESLint } from 'eslint';

export const eslintConfig: ESLint.Options = {
	extensions: ['.ts'],
	baseConfig: {
		extends: ['@guardian/eslint-config-typescript'],
		ignorePatterns: ['__snapshots__'],
	},
	errorOnUnmatchedPattern: false,
};
