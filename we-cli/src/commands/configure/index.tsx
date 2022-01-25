import React, { FC, useEffect, useState } from 'react';
import { Text } from 'ink';
import { ActivityType, TaskFactory, UI } from '../../core';
import * as prettierCommand from './prettier';
import * as gitignoreCommand from './gitignore';
import { Toolchain } from './toolchain';

const allCommands: { [toolchain in Toolchain]: TaskFactory } = {
	prettier: prettierCommand.command,
	gitignore: gitignoreCommand.command
};

export const AVAILABLE_TOOLCHAINS = Object.keys(allCommands)


const App: FC<{ configType: Toolchain }> = ({ configType }) => {
	const [status, setStatus] = useState<ActivityType>('idle');
	const [data, setData] = useState<string | null>('');

	useEffect(() => {
		const activeTask = allCommands[configType]();
		setStatus('running');
		activeTask()
			.then(() => {
				setStatus('done');
				setData('');
			})
			.catch(() => {
				setStatus('error');
			})
			.finally(() => setData(null));
	}, []);

	return (
		<>
			<Text>
				<UI.LoadingSymbol status={status} />
				<Text color="green"> {configType}</Text>
			</Text>
			{<Text>{data}</Text>}
		</>
	);
};

export default App;
