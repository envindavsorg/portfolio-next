import { useStepper } from '@/components/ui/Step';
import { cn } from '@/lib/utils';
import type React from 'react';

interface StepLabelProps {
	isCurrentStep?: boolean;
	opacity: number;
	label?: string | React.ReactNode;
}

export const StepLabel = ({
	isCurrentStep,
	opacity,
	label,
}: StepLabelProps): React.JSX.Element | null => {
	const { styles } = useStepper();
	const shouldRender: boolean = !!label;

	return shouldRender ? (
		<div
			aria-current={isCurrentStep ? 'step' : undefined}
			className={cn(
				'stepper__step-label-container',
				styles?.['step-label-container'],
			)}
			style={{ opacity }}
		>
			{!!label && (
				<span
					className={cn(
						'stepper__step-label',
						styles?.['step-label'],
						'ms-3 text-base sm:text-lg',
						isCurrentStep
							? 'font-bold text-foreground'
							: 'font-medium text-muted-foreground',
					)}
				>
					{label}
				</span>
			)}
		</div>
	) : null;
};
