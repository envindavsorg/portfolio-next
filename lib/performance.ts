/**
 * Performance monitoring utilities
 */
import React from 'react';

// Performance measurement utility
export class PerformanceMonitor {
	private static instance: PerformanceMonitor;
	private measurements: Map<string, number> = new Map();

	private constructor() {}

	public static getInstance(): PerformanceMonitor {
		if (!PerformanceMonitor.instance) {
			PerformanceMonitor.instance = new PerformanceMonitor();
		}
		return PerformanceMonitor.instance;
	}

	public startMeasurement(name: string): void {
		if (typeof window !== 'undefined' && window.performance) {
			this.measurements.set(name, performance.now());
		}
	}

	public endMeasurement(name: string): number {
		if (typeof window !== 'undefined' && window.performance) {
			const startTime = this.measurements.get(name);
			if (startTime) {
				const duration = performance.now() - startTime;
				this.measurements.delete(name);
				
				// Log in development
				if (process.env.NODE_ENV === 'development') {
					console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
				}
				
				return duration;
			}
		}
		return 0;
	}

	public measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			this.startMeasurement(name);
			fn()
				.then((result) => {
					this.endMeasurement(name);
					resolve(result);
				})
				.catch((error) => {
					this.endMeasurement(name);
					reject(error);
				});
		});
	}
}

// Web Vitals reporting
export function reportWebVitals(metric: any): void {
	if (process.env.NODE_ENV === 'production') {
		// You can send to your analytics service here
		console.log(metric);
	}
}

// Component performance wrapper
export function withPerformanceMonitoring<P extends object>(
	WrappedComponent: React.ComponentType<P>,
	componentName: string
): React.ComponentType<P> {
	const monitor = PerformanceMonitor.getInstance();
	
	return function PerformanceWrappedComponent(props: P): React.ReactElement {
		monitor.startMeasurement(`${componentName}-render`);
		
		const Component = WrappedComponent as React.ComponentType<P>;
		const result = React.createElement(Component, props);
		
		// End measurement after next tick
		setTimeout(() => {
			monitor.endMeasurement(`${componentName}-render`);
		}, 0);
		
		return result;
	};
}

// Bundle size analyzer
export function analyzeBundleSize(): void {
	if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
		// Simple bundle size estimation
		const scripts = document.querySelectorAll('script[src]');
		let totalSize = 0;
		
		scripts.forEach((script) => {
			const src = (script as HTMLScriptElement).src;
			if (src.includes('_next/static')) {
				// This is a rough estimation
				totalSize += 1; // You would need to implement actual size calculation
			}
		});
		
		console.log(`[Bundle Analysis] Estimated bundle size: ${totalSize} chunks`);
	}
}