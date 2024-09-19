import type React from 'react';
import type { SVGProps } from 'react';

export const AppleBooksIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		version="1.1"
		id="Livello_1"
		x="0px"
		y="0px"
		width="1em"
		height="1em"
		viewBox="0 0 1024 1024"
		enableBackground="new 0 0 300 300"
		xmlSpace="preserve"
		{...props}
	>
		<defs>
			<linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
				<stop stopColor="#FFA700" offset="0%" />
				<stop stopColor="#F9661E" offset="100%" />
			</linearGradient>
		</defs>
		<g
			id="App-Icon-/-Apple-/-Books-/"
			stroke="none"
			strokeWidth="1"
			fill="none"
			fillRule="evenodd"
		>
			<rect
				id="Origin-Color"
				fill="url(#linearGradient-1)"
				x="0"
				y="0"
				width="1024"
				height="1024"
			/>
			<path
				d="M335,228 C427,228 501,287 501,365 L501,816 C501,816 472,693 332,693 C242,693 186.668851,742.073367 186.668851,742.073367 C174.14919,751.127136 164,745.937236 164,730.473754 L164,316 C164,274 246,228 335,228 Z M689,228 C778,228 860,274 860,316 L860,316 L860,730.473754 C860,745.937236 849.85081,751.127136 837.331149,742.073367 C837.331149,742.073367 782,693 692,693 C552,693 523,816 523,816 L523,816 L523,365 C523,287 597,228 689,228 Z"
				id="Combined-Shape"
				fill="#FFFFFF"
			/>
		</g>
	</svg>
);
