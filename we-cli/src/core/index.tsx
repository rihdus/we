import React, { FC, ReactElement } from 'react';
import { Text } from 'ink';
import Spinner from 'ink-spinner';

export type ActivityType = 'idle' | 'running' | 'done' | 'error';
export type TaskFactory = () => () => Promise<any>;

type ActivityMap<T> = { [statusType in ActivityType]: T };

const LoadingActivitySymbol: ActivityMap<ReactElement> = {
	idle: <Text> </Text>,
	done: <Text color="green">✔</Text>,
	error: <Text color="red">✘</Text>,
	running: (
		<Text>
			<Spinner type="noise" />
		</Text>
	),
};

const LoadingSymbol: FC<{ status: ActivityType }> = (props) =>
	LoadingActivitySymbol[props.status];

export const UI = {
	LoadingSymbol,
};
