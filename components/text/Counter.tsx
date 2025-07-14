'use client';

import NumberFlow from '@number-flow/react';
import type React from 'react';
import { memo, useEffect, useState } from 'react';

interface CounterProps {
	value: number;
	interval?: number;
}

export const Counter = memo(
	({ value, interval = 150 }: CounterProps): React.JSX.Element => {
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

		return (
			<NumberFlow className="font-mono" value={displayValue} respectMotionPreference />
		);
	},
);
