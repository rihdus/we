import { spawn } from 'child_process';

export const command = () => {
	return () =>
		new Promise<void>((resolve, reject) => {
			const ps = spawn('pnpm', ['mrm', 'prettier', '--config:indent', '2']);
			// ps.stdout.on('data', (data) => {
			// 	options.onData && options.onData(data);
			// });
			ps.stderr.on('data', (data) => {
				reject(data);
			});
			ps.on('close', () => {
				resolve();
			});
		});
};
