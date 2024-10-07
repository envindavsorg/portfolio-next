import { useEffect, useState } from 'react';

interface MediaQuery {
	device: 'mobile' | 'tablet' | 'desktop' | null;
	width: number | undefined;
	height: number | undefined;
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
}

type Device = 'mobile' | 'tablet' | 'desktop';

type WindowSize = {
	width: number;
	height: number;
};

const useMediaQuery = (): MediaQuery => {
	const [device, setDevice] = useState<Device | null>(null);
	const [dimensions, setDimensions] = useState<WindowSize | null>(null);

	useEffect((): (() => void) => {
		const checkDevice = (): void => {
			if (window.matchMedia('(max-width: 768px)').matches) {
				setDevice('mobile');
			} else if (
				window.matchMedia('(min-width: 768px) and (max-width: 1024px)').matches
			) {
				setDevice('tablet');
			} else {
				setDevice('desktop');
			}

			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		checkDevice();

		window.addEventListener('resize', checkDevice);

		return (): void => {
			window.removeEventListener('resize', checkDevice);
		};
	}, []);

	return {
		device,
		width: dimensions?.width,
		height: dimensions?.height,
		isMobile: device === 'mobile',
		isTablet: device === 'tablet',
		isDesktop: device === 'desktop',
	};
};

export default useMediaQuery;
