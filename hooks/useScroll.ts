import { useCallback, useEffect, useState } from 'react';

const useScroll = (threshold: number): boolean => {
	const [scrolled, setScrolled] = useState(false);

	const onScroll = useCallback((): void => {
		setScrolled(window.scrollY > threshold);
	}, [threshold]);

	useEffect((): (() => void) => {
		window.addEventListener('scroll', onScroll);

		return (): void => window.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	return scrolled;
};

export default useScroll;
