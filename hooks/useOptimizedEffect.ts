import { useEffect, useRef, type DependencyList, type EffectCallback } from 'react';

/**
 * Optimized useEffect hook that prevents unnecessary re-runs
 * Uses deep comparison for dependency arrays
 */
export function useOptimizedEffect(
	effect: EffectCallback,
	deps?: DependencyList,
): void {
	const prevDeps = useRef<DependencyList | undefined>(undefined);
	const hasChanged = useRef(true);

	// Compare dependencies
	if (deps !== undefined) {
		hasChanged.current = !prevDeps.current || 
			deps.length !== prevDeps.current.length ||
			deps.some((dep, index) => 
				!Object.is(dep, prevDeps.current?.[index])
			);
	}

	useEffect(() => {
		if (hasChanged.current) {
			prevDeps.current = deps;
			return effect();
		}
	}, deps);
}