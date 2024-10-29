import { cn } from '@/lib/utils';
import type React from 'react';
import { useEffect, useState } from 'react';

interface NewMeteors {
	left: string;
	delay: string;
	duration: string;
}

interface MeteorsProps extends React.HTMLAttributes<HTMLSpanElement> {
	number?: number;
	className?: string;
}

export const Meteors = ({ number, className }: MeteorsProps) => {
	const [meteors, setMeteors] = useState<NewMeteors[]>([]);

	useEffect(() => {
		const newMeteors: NewMeteors[] = new Array(number).fill(null).map(() => ({
			left: `${Math.floor(Math.random() * (400 - -400) + -400)}px`,
			delay: `${Math.random() * (0.8 - 0.2) + 0.2}s`,
			duration: `${Math.floor(Math.random() * (10 - 2) + 2)}s`,
		}));

		setMeteors(newMeteors);
	}, [number]);

	return (
		<>
			{meteors.map((meteor, idx) => (
				<span
					key={`meteor${idx}`}
					className={cn(
						'absolute top-1/2 left-1/2 z-10 size-0.5',
						'animate-meteors rounded-[9999px] bg-black dark:bg-white',
						'rotate-[215deg] shadow-[0_0_0_1px_#ffffff10]',
						'before:h-px before:w-[50px] before:content-[""]',
						'before:-translate-y-[50%] before:absolute before:top-1/2 before:transform',
						'before:bg-gradient-to-r before:from-[#64748b] before:to-transparent',
						className,
					)}
					style={{
						top: 0,
						left: meteor.left,
						animationDelay: meteor.delay,
						animationDuration: meteor.duration,
					}}
				/>
			))}
		</>
	);
};
