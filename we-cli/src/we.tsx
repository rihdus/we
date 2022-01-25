#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';

const commander = require('commander');
import CreateCommand from './commands/create';
import ConfigureCommand, { AVAILABLE_TOOLCHAINS } from "./commands/configure";
import { Toolchain } from './commands/configure/toolchain';

const { Command, Option } = commander;

const program = new Command();

program
	.command('create')
	.description('Create project')
	.argument('<project>', 'Project name')
	.addOption(
		new Option('-t --toolchain <toolchain>', 'Toolchain name').choices(AVAILABLE_TOOLCHAINS)
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
			'gitignore',
		])
	)
	.showHelpAfterError(true)
	.action((configType: Toolchain /*, options: any*/) => {
		render(<ConfigureCommand configType={configType} />);
		// console.log(configurationType, options)
	});

program.parseAsync(process.argv);
