import type { Config } from 'jest';
import { SnapshotFormat } from '@jest/schemas';
import { join } from 'path';
import { theirNodeModules } from '../paths';

export interface JestConfigProps {
	withLegacySnapshotFormat: boolean;
	withCdkSetup: boolean;
}

function addSnapshotFormat(config: Config): Config {
	const legacySnapshotFormat: SnapshotFormat = {
		escapeString: true,
		printBasicPrototype: true,
	};

	return {
		...config,
		snapshotFormat: legacySnapshotFormat,
	};
}

function addCdkSetup(config: Config): Config {
	return {
		...config,
		setupFiles: [join(__dirname, 'setup-cdk.js')],
	};
}

export function jestConfig(props: JestConfigProps): Config {
	const { withLegacySnapshotFormat, withCdkSetup } = props;

	const baseConfig: Config = {
		transform: {
			'^.+\\.tsx?$': 'ts-jest',
		},
		moduleDirectories: ['node_modules', theirNodeModules],
		passWithNoTests: true,
	};

	let config: Config = baseConfig;

	if (withLegacySnapshotFormat) {
		config = addSnapshotFormat(config);
	}

	if (withCdkSetup) {
		config = addCdkSetup(config);
	}

	return config;
}
