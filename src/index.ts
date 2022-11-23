import yargs from 'yargs';
import { eslintCommand } from './eslint';
import { jestCommand } from './jest';

const Commands = {
	Hello: 'hello',
	Lint: 'lint',
	Test: 'test',
};

function parseCommandLineArguments() {
	return Promise.resolve(
		yargs
			.usage('$0 <command> <args>')
			.command(Commands.Hello, 'a simple command', (yargs) =>
				yargs.option('name', {
					type: 'string',
					description: 'your name',
					demandOption: true,
				}),
			)
			.command(Commands.Lint, 'run eslint with guardian rules', (yargs) =>
				yargs.option('files', {
					type: 'array',
					description: 'the files to lint',
					default: [
						'src/**',

						// typical directories for a @guardian/cdk project
						'lib/**',
						'bin/**',
					],
				}),
			)
			.command(Commands.Test, 'run jest', (yargs) =>
				yargs
					.option('legacySnapshotFormat', {
						type: 'boolean',
						description:
							'Use snapshot formats for Jest <=28. See https://jestjs.io/docs/upgrading-to-jest29#snapshot-format',
						default: false,
					})
					.option('cdk', {
						type: 'boolean',
						description:
							'Run tests for a CDK project. A mock of the version number will be added.',
						default: false,
					}),
			)
			.demandCommand(1, '')
			.help()
			.alias('h', 'help').argv,
	);
}

parseCommandLineArguments()
	.then((argv): Promise<string | void> => {
		console.log(
			`Hello from @guardian/scripts. It is ${new Date().toLocaleTimeString()}.`,
		);
		const command = argv._[0];

		switch (command) {
			case Commands.Hello: {
				const { name } = argv;
				return Promise.resolve(`👋 Hello ${name}!`);
			}
			case Commands.Lint: {
				const { files } = argv;
				return eslintCommand({ files });
			}
			case Commands.Test: {
				const { legacySnapshotFormat, cdk } = argv;
				return jestCommand({
					withLegacySnapshotFormat: legacySnapshotFormat,
					withCdkSetup: cdk,
				});
			}
			default:
				throw new Error(`Unknown command: ${command ?? ''}`);
		}
	})
	.then((commandResponse) => {
		if (typeof commandResponse === 'string') {
			console.log(commandResponse);
		}
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
