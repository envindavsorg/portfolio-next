import { type DependencyList, type EffectCallback, useEffect, useRef } from 'react';

const useOptimizedEffect = (effect: EffectCallback, deps?: DependencyList): void => {
	const prevDeps = useRef<DependencyList | undefined>(undefined);
	const hasChanged = useRef(true);

	if (deps !== undefined) {
		hasChanged.current =
			!prevDeps.current ||
			deps.length !== prevDeps.current.length ||
			deps.some((dep, index) => !Object.is(dep, prevDeps.current?.[index]));
	}

	useEffect(() => {
		if (hasChanged.current) {
			prevDeps.current = deps;
			return effect();
		}
	}, deps);
};

export default useOptimizedEffect;
