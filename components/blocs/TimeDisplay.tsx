'use client';

import type React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

type TimeDisplayProps = {
	timeZone: string;
	locale?: string;
};

export const TimeDisplay: React.FC<TimeDisplayProps> = ({
	timeZone,
	locale = 'fr-FR',
}: TimeDisplayProps): React.JSX.Element => {
	const [currentTime, setCurrentTime] = useState('');

	useEffect(() => {
		const updateTime = () => {
			const now: Date = new Date();
			const options: Intl.DateTimeFormatOptions = {
				timeZone,
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false,
			};

			const timeString: string = new Intl.DateTimeFormat(
				locale,
				options,
			).format(now);
			setCurrentTime(timeString);
		};

		updateTime();
		const intervalId = setInterval(updateTime, 1000);

		return () => clearInterval(intervalId);
	}, [timeZone, locale]);

	return <p className="font-bold text-sm">{currentTime}</p>;
};
