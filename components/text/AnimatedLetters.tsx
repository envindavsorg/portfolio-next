import type React from 'react';
import { memo } from 'react';

type AnimatedLetterProps = {
	text: string;
};

export const AnimatedLetters = memo(
	({ text }: AnimatedLetterProps): React.JSX.Element => (
		<>
			{text.split('').map((char, idx) => (
				<span
					key={idx}
					className="inline-block"
					style={{ transitionDelay: `${idx * 25}ms` }}
				>
					{char === ' ' ? ' ' : char}
				</span>
			))}
		</>
	),
);
