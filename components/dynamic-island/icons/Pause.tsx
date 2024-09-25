import type React from 'react';
import type { SVGProps } from 'react';

export const Pause = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="28"
		height="28"
		fill="none"
		viewBox="0 0 28 28"
		{...props}
	>
		<path
			fill="#fefefe"
			d="M8.675 23.465h2.75c1.1 0 1.672-.573 1.672-1.682V5.673c0-1.128-.573-1.665-1.672-1.673h-2.75C7.575 4 7 4.573 7 5.673v16.11c-.006 1.11.567 1.682 1.675 1.682Zm8.87 0h2.74c1.109 0 1.674-.573 1.674-1.682V5.673C21.96 4.544 21.394 4 20.285 4h-2.74c-1.11 0-1.685.573-1.685 1.673v16.11c0 1.11.569 1.682 1.684 1.682Z"
		/>
	</svg>
);
