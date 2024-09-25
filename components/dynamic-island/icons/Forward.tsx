import type React from 'react';

type BackwardProps = {
	className?: string;
	onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
};

export const Forward: React.FC<BackwardProps> = ({ className, onClick }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="34"
			height="28"
			fill="none"
			viewBox="0 0 34 28"
			className={className}
			onClick={onClick}
		>
			<path
				fill="#fefefe"
				d="M1.877 23.83c.517 0 .957-.152 1.456-.45l12.002-7.053c.879-.517 1.328-1.136 1.328-1.921 0-.778-.441-1.382-1.328-1.903L3.333 5.45c-.51-.298-.941-.45-1.46-.45C.858 5 0 5.775 0 7.187v14.455c0 1.411.862 2.188 1.877 2.188Zm16.596 0c.514 0 .956-.152 1.455-.45l12.01-7.053c.869-.517 1.318-1.136 1.318-1.921 0-.778-.441-1.382-1.318-1.903L19.928 5.45c-.5-.298-.943-.45-1.462-.45-1.015 0-1.87.775-1.87 2.187v14.455c0 1.411.86 2.188 1.877 2.188Z"
			/>
		</svg>
	);
};
