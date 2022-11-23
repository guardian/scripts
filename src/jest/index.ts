import { run } from 'jest-cli';
import { jestConfig, JestConfigProps } from './config';

type JestCommandProps = JestConfigProps;

export function jestCommand(props: JestCommandProps): Promise<void> {
	const config = jestConfig(props);

	return run(['--config', JSON.stringify(config)]);
}
