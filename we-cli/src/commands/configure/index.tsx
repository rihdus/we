import React, { FC, useEffect, useState } from 'react';
import { Text } from 'ink';
import { ActivityType, UI } from '../../core';
import * as prettierCommand from './prettier';

const App: FC<{ configType?: string }> = ({ configType = '' }) => {
	const [status, setStatus] = useState<ActivityType>('idle');
	// @ts-ignore
	const [data, setData] = useState<string | null>('');

	useEffect(() => {
		let activeTask: PromiseFn = () => Promise.resolve();
		setStatus('running');
		switch (configType) {
			case 'prettier':
				activeTask = prettierCommand.command();
				break;
		}
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

type PromiseFn = () => Promise<any>;
