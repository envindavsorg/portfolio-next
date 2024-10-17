import { cn } from '@/lib/utils';
import type React from 'react';
import { useId } from 'react';

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
	width?: any;
	height?: any;
	x?: any;
	y?: any;
	cx?: any;
	cy?: any;
	className?: string;
}

export const DotPattern = ({
	width = 16,
	height = 16,
	x = 0,
	y = 0,
	cx = 1,
	cy = 1,
	className,
	...props
}: DotPatternProps) => {
	const id: string = useId();

	return (
		<svg
			className={cn(
				'pointer-events-none absolute inset-0 size-full',
				'[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]',
				className,
			)}
			{...props}
		>
			<defs>
				<pattern
					id={id}
					width={width}
					height={height}
					patternUnits="userSpaceOnUse"
					patternContentUnits="userSpaceOnUse"
					x={x}
					y={y}
				>
					<circle id="pattern-circle" cx={cx} cy={cy} r={1} />
				</pattern>
			</defs>
			<rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
		</svg>
	);
};
