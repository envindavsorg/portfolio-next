import { Button } from '@/components/ui/Button';
import { Collapsible, CollapsibleContent } from '@/components/ui/Collapsible';
import { cn } from '@/lib/utils';
import { Spinner, X } from '@phosphor-icons/react/dist/ssr';
import { Check as CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';
import { cva } from 'class-variance-authority';
import React, {
	forwardRef,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

type IconType = React.ComponentType<any> | undefined;

export type StepItem = {
	id?: string;
	label?: string;
	description?: string;
	icon?: IconType;
	optional?: boolean;
	sup?: boolean;
	supText?: string;
};

interface StepOptions {
	orientation?: 'vertical' | 'horizontal';
	state?: 'loading' | 'error';
	responsive?: boolean;
	checkIcon?: IconType;
	errorIcon?: IconType;
	onClickStep?: (step: number, setStep: (step: number) => void) => void;
	mobileBreakpoint?: string;
	variant?: 'circle' | 'circle-alt' | 'line';
	expandVerticalSteps?: boolean;
	size?: 'sm' | 'md' | 'lg';
	styles?: {
		/** Styles for the main container */
		'main-container'?: string;
		/** Styles for the horizontal step */
		'horizontal-step'?: string;
		/** Styles for the horizontal step container (button and labels) */
		'horizontal-step-container'?: string;
		/** Styles for the vertical step */
		'vertical-step'?: string;
		/** Styles for the vertical step container (button and labels) */
		'vertical-step-container'?: string;
		/** Styles for the vertical step content */
		'vertical-step-content'?: string;
		/** Styles for the step button container */
		'step-button-container'?: string;
		/** Styles for the label and description container */
		'step-label-container'?: string;
		/** Styles for the step label */
		'step-label'?: string;
		/** Styles for the step description */
		'step-description'?: string;
	};
	variables?: {
		'--step-icon-size'?: string;
		'--step-gap'?: string;
	};
	scrollTracking?: boolean;
}

export interface StepperProps extends StepOptions {
	children?: React.ReactNode;
	className?: string;
	initialStep: number;
	steps: StepItem[];
}

interface StepProps extends React.HTMLAttributes<HTMLLIElement> {
	label?: string | React.ReactNode;
	description?: string;
	icon?: IconType;
	sup?: boolean;
	supText?: string;
	state?: 'loading' | 'error';
	checkIcon?: IconType;
	errorIcon?: IconType;
	isCompletedStep?: boolean;
	isKeepError?: boolean;
	onClickStep?: (step: number, setStep: (step: number) => void) => void;
}

interface StepSharedProps extends StepProps {
	isLastStep?: boolean;
	isCurrentStep?: boolean;
	index?: number;
	hasVisited: boolean | undefined;
	isError?: boolean;
	isLoading?: boolean;
}

interface StepInternalConfig {
	index: number;
	isCompletedStep?: boolean;
	isCurrentStep?: boolean;
	isLastStep?: boolean;
}

export const Step = forwardRef<HTMLLIElement, StepProps>(
	(props, ref: React.Ref<any>): React.JSX.Element => {
		const {
			children,
			icon,
			supText,
			state,
			checkIcon,
			errorIcon,
			index,
			isCompletedStep,
			isCurrentStep,
			isLastStep,
			isKeepError,
			label,
			onClickStep,
		} = props as StepInternalConfig & StepProps;

		const { isVertical, isError, isLoading, clickable } = useStepper();

		const hasVisited = isCurrentStep || isCompletedStep;

		const sharedProps = {
			isLastStep,
			isCompletedStep,
			isCurrentStep,
			index,
			isError,
			isLoading,
			clickable,
			label,
			hasVisited,
			icon,
			supText,
			isKeepError,
			checkIcon,
			state,
			errorIcon,
			onClickStep,
		};

		const renderStep = (): React.JSX.Element => {
			switch (isVertical) {
				case true:
					return (
						<VerticalStep ref={ref} {...sharedProps}>
							{children}
						</VerticalStep>
					);
				default:
					return <HorizontalStep ref={ref} {...sharedProps} />;
			}
		};

		return renderStep();
	},
);

const usePrevious = <T,>(value: T): T | undefined => {
	const ref = useRef<T>(undefined);

	useEffect((): void => {
		ref.current = value;
	}, [value]);

	return ref.current;
};

export const useStepper = () => {
	const context = useContext(StepperContext);

	if (context === undefined) {
		throw new Error('useStepper must be used within a StepperProvider');
	}

	const { children, className, ...rest } = context;

	const isLastStep = context.activeStep === context.steps.length - 1;
	const hasCompletedAllSteps = context.activeStep === context.steps.length;

	const previousActiveStep = usePrevious(context.activeStep);

	const currentStep = context.steps[context.activeStep];
	const isOptionalStep = !!currentStep?.optional;

	const isDisabledStep = context.activeStep === 0;

	return {
		...rest,
		isLastStep,
		hasCompletedAllSteps,
		isOptionalStep,
		isDisabledStep,
		currentStep,
		previousActiveStep,
	};
};

type VerticalStepProps = StepSharedProps & {
	children?: React.ReactNode;
};

const verticalStepVariants = cva(
	[
		'relative flex flex-col transition-all duration-200',
		'data-[completed=true]:[&:not(:last-child)]:after:bg-primary',
		'data-[invalid=true]:[&:not(:last-child)]:after:bg-destructive',
	],
	{
		variants: {
			variant: {
				circle: cn(
					'[&:not(:last-child)]:gap-[var(--step-gap)] [&:not(:last-child)]:pb-[var(--step-gap)]',
					'[&:not(:last-child)]:after:w-[2px] [&:not(:last-child)]:after:bg-border [&:not(:last-child)]:after:content-[""]',
					'[&:not(:last-child)]:after:inset-x-[calc(var(--step-icon-size)/2)]',
					'[&:not(:last-child)]:after:absolute',
					'[&:not(:last-child)]:after:top-[calc(var(--step-icon-size)+var(--step-gap))]',
					'[&:not(:last-child)]:after:bottom-[var(--step-gap)]',
					'[&:not(:last-child)]:after:transition-all [&:not(:last-child)]:after:duration-200',
				),
				line: 'mb-4 flex-1 border-t-0',
			},
		},
	},
);

export const VerticalStep = forwardRef<HTMLDivElement, VerticalStepProps>(
	(props, ref): React.JSX.Element => {
		const {
			children,
			index,
			isCompletedStep,
			isCurrentStep,
			label,
			icon,
			supText,
			hasVisited,
			state,
			checkIcon: checkIconProp,
			errorIcon: errorIconProp,
			onClickStep,
		} = props;

		const {
			checkIcon: checkIconContext,
			errorIcon: errorIconContext,
			isError,
			isLoading,
			variant,
			onClickStep: onClickStepGeneral,
			clickable,
			expandVerticalSteps,
			styles,
			scrollTracking,
			orientation,
			steps,
			setStep,
			isLastStep: isLastStepCurrentStep,
			previousActiveStep,
		} = useStepper();

		const opacity = hasVisited ? 1 : 0.8;
		const localIsLoading = isLoading || state === 'loading';
		const localIsError = isError || state === 'error';

		const isLastStep = index === steps.length - 1;

		const active =
			variant === 'line' ? isCompletedStep || isCurrentStep : isCompletedStep;
		const checkIcon = checkIconProp || checkIconContext;
		const errorIcon = errorIconProp || errorIconContext;

		const renderChildren = (): React.ReactNode => {
			if (!expandVerticalSteps) {
				return (
					<Collapsible open={isCurrentStep}>
						<CollapsibleContent
							ref={(node): void => {
								if (
									scrollTracking &&
									((index === 0 &&
										previousActiveStep &&
										previousActiveStep === steps.length) ||
										(index && index > 0))
								) {
									node?.scrollIntoView({
										behavior: 'smooth',
										block: 'center',
									});
								}
							}}
							className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
						>
							{children}
						</CollapsibleContent>
					</Collapsible>
				);
			}
			return children;
		};

		return (
			<div
				ref={ref}
				className={cn(
					'stepper__vertical-step',
					verticalStepVariants({
						variant: variant?.includes('circle') ? 'circle' : 'line',
					}),
					isLastStepCurrentStep && 'gap-[var(--step-gap)]',
					styles?.['vertical-step'],
				)}
				data-optional={steps[index || 0]?.optional}
				data-completed={isCompletedStep}
				data-active={active}
				data-clickable={clickable || !!onClickStep}
				data-invalid={localIsError}
				onClick={(): void =>
					onClickStep?.(index || 0, setStep) ||
					onClickStepGeneral?.(index || 0, setStep)
				}
			>
				<div
					data-vertical={true}
					data-active={active}
					className={cn(
						'stepper__vertical-step-container',
						'flex items-center',
						variant === 'line' &&
							'border-s-[3px] py-2 ps-3 data-[active=true]:border-primary',
						styles?.['vertical-step-container'],
					)}
				>
					<StepButtonContainer
						{...{ isLoading: localIsLoading, isError: localIsError, ...props }}
					>
						<StepIcon
							{...{
								index,
								isError: localIsError,
								isLoading: localIsLoading,
								isCurrentStep,
								isCompletedStep,
							}}
							icon={icon}
							checkIcon={checkIcon}
							errorIcon={errorIcon}
						/>
					</StepButtonContainer>
					<StepLabel
						label={label}
						supText={supText}
						{...{ isCurrentStep, opacity }}
					/>
				</div>
				<div
					className={cn(
						'stepper__vertical-step-content',
						!isLastStep && 'min-h-4',
						variant !== 'line' && 'ps-[--step-icon-size]',
						variant === 'line' && orientation === 'vertical' && 'min-h-0',
						styles?.['vertical-step-content'],
					)}
				>
					{renderChildren()}
				</div>
			</div>
		);
	},
);

export const HorizontalStep = forwardRef<HTMLDivElement, StepSharedProps>(
	(props, ref): React.JSX.Element => {
		const {
			isError,
			isLoading,
			onClickStep,
			variant,
			clickable,
			checkIcon: checkIconContext,
			errorIcon: errorIconContext,
			styles,
			steps,
			setStep,
		} = useStepper();

		const {
			index,
			isCompletedStep,
			isCurrentStep,
			hasVisited,
			icon,
			label,
			description,
			isKeepError,
			state,
			checkIcon: checkIconProp,
			errorIcon: errorIconProp,
		} = props;

		const localIsLoading: boolean = isLoading || state === 'loading';
		const localIsError: boolean = isError || state === 'error';
		const opacity: number = hasVisited ? 1 : 0.8;
		const active: boolean | undefined =
			variant === 'line' ? isCompletedStep || isCurrentStep : isCompletedStep;
		const checkIcon = checkIconProp || checkIconContext;
		const errorIcon = errorIconProp || errorIconContext;

		return (
			<div
				aria-disabled={!hasVisited}
				className={cn(
					'stepper__horizontal-step',
					'relative flex items-center transition-all duration-200',
					'[&:not(:last-child)]:flex-1',
					'[&:not(:last-child)]:after:transition-all [&:not(:last-child)]:after:duration-200',
					'[&:not(:last-child)]:after:h-[2px] [&:not(:last-child)]:after:bg-border [&:not(:last-child)]:after:content-[""]',
					'data-[completed=true]:[&:not(:last-child)]:after:bg-primary',
					'data-[invalid=true]:[&:not(:last-child)]:after:bg-destructive',
					variant === 'circle-alt' &&
						'flex-1 flex-col justify-start [&:not(:last-child)]:after:relative [&:not(:last-child)]:after:start-[50%] [&:not(:last-child)]:after:end-[50%] [&:not(:last-child)]:after:top-[calc(var(--step-icon-size)/2)] [&:not(:last-child)]:after:order-[-1] [&:not(:last-child)]:after:w-[calc((100%-var(--step-icon-size))-(var(--step-gap)))]',
					variant === 'circle' &&
						'[&:not(:last-child)]:after:ms-[var(--step-gap)] [&:not(:last-child)]:after:me-[var(--step-gap)] [&:not(:last-child)]:after:flex-1',
					variant === 'line' &&
						'flex-1 flex-col border-t-[3px] data-[active=true]:border-primary',
					styles?.['horizontal-step'],
				)}
				data-optional={steps[index || 0]?.optional}
				data-completed={isCompletedStep}
				data-active={active}
				data-invalid={localIsError}
				data-clickable={clickable}
				onClick={() => onClickStep?.(index || 0, setStep)}
				ref={ref}
			>
				<div
					className={cn(
						'stepper__horizontal-step-container',
						'flex items-center',
						variant === 'circle-alt' && 'flex-col justify-center gap-1',
						variant === 'line' && 'w-full',
						styles?.['horizontal-step-container'],
					)}
				>
					<StepButtonContainer
						{...{ ...props, isError: localIsError, isLoading: localIsLoading }}
					>
						<StepIcon
							{...{
								index,
								isCompletedStep,
								isCurrentStep,
								isError: localIsError,
								isKeepError,
								isLoading: localIsLoading,
							}}
							icon={icon}
							checkIcon={checkIcon}
							errorIcon={errorIcon}
						/>
					</StepButtonContainer>
					<StepLabel
						label={label}
						description={description}
						{...{ isCurrentStep, opacity }}
					/>
				</div>
			</div>
		);
	},
);

interface StepLabelProps {
	isCurrentStep?: boolean;
	opacity: number;
	label?: string | React.ReactNode;
	description?: string | null;
	sup?: boolean;
	supText?: string;
}

const labelVariants = cva('', {
	variants: {
		size: {
			sm: 'text-sm sm:text-base',
			md: 'text-base sm:text-lg',
			lg: 'text-lg sm:text-xl',
		},
	},
	defaultVariants: {
		size: 'sm',
	},
});

export const StepLabel = ({
	isCurrentStep,
	opacity,
	label,
}: StepLabelProps): React.JSX.Element | null => {
	const { variant, styles, size, orientation } = useStepper();
	const shouldRender = !!label;

	return shouldRender ? (
		<div
			aria-current={isCurrentStep ? 'step' : undefined}
			className={cn(
				'stepper__step-label-container',
				'flex flex-col',
				variant === 'line' ? orientation === 'horizontal' && 'my-2' : 'ms-2',
				variant === 'circle-alt' && 'ms-3 text-center',
				variant === 'circle-alt' && orientation === 'horizontal' && 'ms-0',
				variant === 'circle-alt' && orientation === 'vertical' && 'text-start',
				styles?.['step-label-container'],
			)}
			style={{
				opacity,
			}}
		>
			{!!label && (
				<span
					className={cn(
						'stepper__step-label font-geist-sans',
						'ms-3 text-foreground tracking-tight',
						labelVariants({ size }),
						styles?.['step-label'],
						isCurrentStep
							? 'font-extrabold text-theme'
							: 'font-medium text-foreground',
					)}
				>
					{label}
				</span>
			)}
		</div>
	) : null;
};

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

const iconVariants = cva('', {
	variants: {
		size: {
			sm: 'size-3',
			md: 'size-4',
			lg: 'size-5',
		},
	},
	defaultVariants: {
		size: 'sm',
	},
});

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

		const Check = useMemo(
			() => (CustomCheckIcon ? CustomCheckIcon : CheckIcon),
			[CustomCheckIcon],
		);

		return useMemo((): React.JSX.Element => {
			if (isCompletedStep) {
				if (isError && isKeepError) {
					return (
						<div key="icon">
							<X className={cn(iconVariants({ size }))} />
						</div>
					);
				}

				return (
					<div key="check-icon">
						<Check className={cn(iconVariants({ size }))} />
					</div>
				);
			}

			if (isCurrentStep) {
				if (isError && ErrorIcon) {
					return (
						<div key="error-icon">
							<ErrorIcon className={cn(iconVariants({ size }))} />
						</div>
					);
				}

				if (isError) {
					return (
						<div key="icon">
							<X className={cn(iconVariants({ size }))} />
						</div>
					);
				}

				if (isLoading) {
					return (
						<Spinner className={cn(iconVariants({ size }), 'animate-spin')} />
					);
				}
			}

			if (Icon) {
				return (
					<div key="step-icon">
						<Icon className={cn(iconVariants({ size }))} />
					</div>
				);
			}

			return (
				<span
					ref={ref}
					key="label"
					className={cn('text-center font-bold text-sm')}
				>
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
			Check,
			ErrorIcon,
			isKeepError,
			ref,
			size,
		]);
	},
);

type StepButtonContainerProps = StepSharedProps & {
	children?: React.ReactNode;
};

export const StepButtonContainer = ({
	isCurrentStep,
	isCompletedStep,
	children,
	isError,
	isLoading: isLoadingProp,
	onClickStep,
}: StepButtonContainerProps): React.JSX.Element | null => {
	const {
		clickable,
		isLoading: isLoadingContext,
		variant,
		styles,
	} = useStepper();

	const currentStepClickable = clickable || !!onClickStep;

	const isLoading = isLoadingProp || isLoadingContext;

	if (variant === 'line') {
		return null;
	}

	return (
		<Button
			variant="ghost"
			type="button"
			tabIndex={currentStepClickable ? 0 : -1}
			className={cn(
				'stepper__step-button-container',
				'pointer-events-none rounded-full p-0',
				'h-[var(--step-icon-size)] w-[var(--step-icon-size)]',
				'flex items-center justify-center rounded-full border border-neutral-200 bg-background dark:border-neutral-700',
				'data-[clickable=true]:pointer-events-auto',
				'data-[active=true]:border-theme data-[active=true]:bg-background data-[active=true]:text-theme',
				'data-[current=true]:border-theme data-[current=true]:bg-background data-[current=true]:text-theme',
				'data-[invalid=true]:border-destructive data-[invalid=true]:bg-background data-[invalid=true]:text-destructive',
				styles?.['step-button-container'],
			)}
			aria-current={isCurrentStep ? 'step' : undefined}
			data-current={isCurrentStep}
			data-invalid={isError && (isCurrentStep || isCompletedStep)}
			data-active={isCompletedStep}
			data-clickable={currentStepClickable}
			data-loading={isLoading && (isCurrentStep || isCompletedStep)}
		>
			{children}
		</Button>
	);
};

interface StepperContextValue extends StepperProps {
	clickable?: boolean;
	isError?: boolean;
	isLoading?: boolean;
	isVertical?: boolean;
	stepCount?: number;
	expandVerticalSteps?: boolean;
	activeStep: number;
	initialStep: number;
}

type StepperContextProviderProps = {
	value: Omit<StepperContextValue, 'activeStep'>;
	children: React.ReactNode;
};

export const StepperContext = React.createContext<
	StepperContextValue & {
		nextStep: () => void;
		prevStep: () => void;
		resetSteps: () => void;
		setStep: (step: number) => void;
	}
>({
	steps: [],
	activeStep: 0,
	initialStep: 0,
	nextStep: (): void => {},
	prevStep: (): void => {},
	resetSteps: (): void => {},
	setStep: (): void => {},
});

export const StepperProvider = ({
	value,
	children,
}: StepperContextProviderProps): React.JSX.Element => {
	const isError: boolean = value.state === 'error';
	const isLoading: boolean = value.state === 'loading';

	const [activeStep, setActiveStep] = useState(value.initialStep);

	const nextStep = (): void => {
		setActiveStep((prev): number => prev + 1);
	};

	const prevStep = (): void => {
		setActiveStep((prev): number => prev - 1);
	};

	const resetSteps = (): void => {
		setActiveStep(value.initialStep);
	};

	const setStep = (step: number): void => {
		setActiveStep(step);
	};

	return (
		<StepperContext.Provider
			value={{
				...value,
				isError,
				isLoading,
				activeStep,
				nextStep,
				prevStep,
				resetSteps,
				setStep,
			}}
		>
			{children}
		</StepperContext.Provider>
	);
};
