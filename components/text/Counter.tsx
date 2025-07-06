'use client';

import NumberFlow from '@number-flow/react';
import { useEffect, useState } from 'react';

interface CounterProps {
	value: number;
	interval?: number;
}

export const Counter = ({ value, interval = 150 }: CounterProps) => {
	const [displayValue, setDisplayValue] = useState(0);

	useEffect(() => {
		let current = 0;
		setDisplayValue(0);

		if (value > 0) {
			const tick = () => {
				current += 1;
				setDisplayValue(current);
				if (current < value) {
					setTimeout(tick, interval);
				}
			};
			tick();
		}
	}, [value, interval]);

	return <NumberFlow value={displayValue} respectMotionPreference />;
};
