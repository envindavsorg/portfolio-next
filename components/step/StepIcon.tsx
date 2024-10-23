import { Button } from '@/components/ui/Button';
import {
	type IconType,
	type StepSharedProps,
	useStepper,
} from '@/components/ui/Step';
import { cn } from '@/lib/utils';
import { Check, Spinner, X } from '@phosphor-icons/react/dist/ssr';
import type React from 'react';
import { forwardRef, useMemo } from 'react';

interface StepIconProps {
	isCompletedStep?: boolean;
	isCurrentStep?: boolean;
	isError?: boolean;
	isLoading?: boolean;
	isKeepError?: boolean;
	icon?: IconType;
	index?: number;
	checkIcon?: IconType;
	errorIcon?: IconType;
}

export const StepIcon = forwardRef<HTMLDivElement, StepIconProps>(
	(props, ref): React.JSX.Element => {
		const { size } = useStepper();

		const {
			isCompletedStep,
			isCurrentStep,
			isError,
			isLoading,
			isKeepError,
			icon: CustomIcon,
			index,
			checkIcon: CustomCheckIcon,
			errorIcon: CustomErrorIcon,
		} = props;

		const Icon = useMemo(() => (CustomIcon ? CustomIcon : null), [CustomIcon]);

		const ErrorIcon = useMemo(
			() => (CustomErrorIcon ? CustomErrorIcon : null),
			[CustomErrorIcon],
		);

		const CheckIcon = useMemo(
			() => (CustomCheckIcon ? CustomCheckIcon : Check),
			[CustomCheckIcon],
		);

		return useMemo((): React.JSX.Element => {
			if (isCompletedStep) {
				if (isError && isKeepError) {
					return (
						<div key="icon">
							<X className="size-3" />
						</div>
					);
				}

				return (
					<div key="check-icon">
						<Check className="size-3" weight="bold" />
					</div>
				);
			}

			if (isCurrentStep) {
				if (isError && ErrorIcon) {
					return (
						<div key="error-icon">
							<ErrorIcon className="size-3" weight="bold" />
						</div>
					);
				}

				if (isError) {
					return (
						<div key="icon">
							<X className="size-3" weight="bold" />
						</div>
					);
				}

				if (isLoading) {
					return <Spinner className="size-3 animate-spin" weight="bold" />;
				}
			}

			if (Icon) {
				return (
					<div key="step-icon">
						<Icon className="size-3" weight="bold" />
					</div>
				);
			}

			return (
				<span ref={ref} key="label" className="text-center font-bold text-sm">
					{(index || 0) + 1}
				</span>
			);
		}, [
			isCompletedStep,
			isCurrentStep,
			isError,
			isLoading,
			Icon,
			index,
			CheckIcon,
			ErrorIcon,
			isKeepError,
			ref,
			size,
		]);
	},
);

type StepIconContainerProps = StepSharedProps & {
	children?: React.ReactNode;
};

export const StepIconContainer = ({
	isCurrentStep,
	isCompletedStep,
	children,
	isError,
	isLoading: isLoadingProp,
	onClickStep,
}: StepIconContainerProps): React.JSX.Element | null => {
	const { clickable, isLoading: isLoadingContext, styles } = useStepper();
	const currentStepClickable: boolean = clickable || !!onClickStep;
	const isLoading: boolean | undefined = isLoadingProp || isLoadingContext;

	return (
		<Button
			variant="ghost"
			type="button"
			tabIndex={currentStepClickable ? 0 : -1}
			aria-current={isCurrentStep ? 'step' : undefined}
			data-clickable={currentStepClickable}
			data-loading={isLoading && (isCurrentStep || isCompletedStep)}
			className={cn(
				styles?.['step-button-container'],
				'size-[var(--step-icon-size)] data-[clickable=true]:pointer-events-auto',
				'pointer-events-none flex items-center justify-center rounded-full p-0',
				'border border-neutral-200 text-muted-foreground dark:border-neutral-700',
				isCurrentStep && '!!border !border-foreground !text-foreground',
				isCompletedStep && '!border !border-theme !text-theme',
				isError && (isCurrentStep || isCompletedStep) && '',
			)}
		>
			{children}
		</Button>
	);
};
