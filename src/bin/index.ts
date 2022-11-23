import yargs from 'yargs';

console.log(`I am the CLI! It is ${new Date().toTimeString()}`);

const Commands = {
	Hello: 'hello',
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
			.demandCommand(1, '')
			.help()
			.alias('h', 'help').argv,
	);
}

parseCommandLineArguments()
	.then((argv) => {
		const command = argv._[0];

		switch (command) {
			case Commands.Hello: {
				const { name } = argv;
				return Promise.resolve(`👋 Hello ${name}!`);
			}
			default:
				throw new Error(`Unknown command: ${command ?? ''}`);
		}
	})
	.then((commandResponse) => {
		console.log(commandResponse);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
