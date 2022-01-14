#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';

const commander = require('commander');
import CreateCommand from './commands/create';
import ConfigureCommand from './commands/configure';

const { Command, Option } = commander;

const program = new Command();

program
	.command('create')
	.description('Create project')
	.argument('<project>', 'Project name')
	.addOption(
		new Option('-t --toolchain <toolchain>', 'Toolchain name').choices([
			'Gatsby',
			'NextJs',
		])
	)
	.showHelpAfterError(true)
	.action((projectName: string, options: any) => {
		render(<CreateCommand name={projectName + options.toolchain} />);
	});

program
	.command('configure')
	.description('Initialize configuration in a project')
	.addArgument(
		new commander.Argument('<configType>', 'Configuration Type').choices([
			'prettier',
			'eslint',
			'editorconfig',
		])
	)
	.showHelpAfterError(true)
	.action((configType: string /*, options: any*/) => {
		render(<ConfigureCommand configType={configType} />);
		// console.log(configurationType, options)
	});

program.parseAsync(process.argv);
