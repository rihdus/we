#!/usr/bin/env node
import React from "react";
import { render } from "ink";
const { Command, Option } = require("commander");
import CreateCommand from "./commands/create";

const program = new Command();

program
	.command("create")
	.description("Create project")
	.argument("<project>", "Project name")
	.addOption(
		new Option("-t --toolchain <toolchain>", "Toolchain name").choices([
			"Gatsby",
			"NextJs",
			"large",
		])
	)
	.action((projectName: string, options: any) => {
		render(<CreateCommand name={projectName + options.toolchain} />);
	});
	
program.parseAsync(process.argv);
