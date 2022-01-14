import React, { FC, useEffect, useState } from 'react';
import { Text } from 'ink';
import { spawn } from 'child_process';

const App: FC<{ configType?: string }> = ({ configType = '' }) => {
	const [status, setStatus] = useState('Configuring');
	// @ts-ignore
	const [data, setData] = useState('');

	useEffect(() => {
		const ps = spawn('pnpm', ['mrm', 'prettier']);
		setStatus('Running');
		ps.stdout.on('data', (data) => {
			setData(`${data}`);
		});
		ps.on('close', () => {
			setStatus('Done');
			setData('')
		});
	}, []);

	return (
		<>
			<Text>
				<Text color="green">{configType}</Text>
				<Text> {status}</Text>
			</Text>
			{<Text>{data}</Text>}
		</>
	);
};

export default App;
