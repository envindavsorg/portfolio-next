import type React from 'react';
import type { SVGProps } from 'react';

export const HTML5Icon = (props: SVGProps<SVGSVGElement>): React.JSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 452 520"
		width="1em"
		height="1em"
		{...props}
	>
		<path fill="#E34F26" d="M41 460L0 0h451l-41 460-185 52" />
		<path fill="#EF652A" d="M226 472l149-41 35-394H226" />
		<path
			fill="#ECEDEE"
			d="M226 208h-75l-5-58h80V94H84l15 171h127zm0 147l-64-17-4-45h-56l7 89 117 32z"
		/>
		<path
			fill="#FFFFFF"
			d="M226 265h69l-7 73-62 17v59l115-32 16-174H226zm0-171v56h136l5-56z"
		/>
	</svg>
);
