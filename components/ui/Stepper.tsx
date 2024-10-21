'use client';

import {
	Step,
	type StepperProps,
	StepperProvider,
	useStepper,
} from '@/components/ui/Step';
import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import React, { forwardRef, Fragment } from 'react';

interface VariablesSizes {
	md: string;
	sm: string;
	lg: string;
}

const VARIABLE_SIZES: VariablesSizes = {
	sm: '36px',
	md: '40px',
	lg: '44px',
};

const Stepper = forwardRef<HTMLDivElement, StepperProps>(
	(props, ref: React.Ref<HTMLDivElement>): React.JSX.Element => {
		const {
			className,
			children,
			orientation: orientationProp,
			state,
			responsive,
			checkIcon,
			errorIcon,
			onClickStep,
			mobileBreakpoint,
			expandVerticalSteps = false,
			initialStep = 0,
			size,
			steps,
			variant,
			styles,
			variables,
			scrollTracking = false,
			...rest
		} = props;
		const { isMobile } = useMediaQuery();

		const childArr = React.Children.toArray(children);
		const items = [] as React.ReactElement[];

		const footer = childArr.map((child, _index) => {
			if (!React.isValidElement(child)) {
				throw new Error('Stepper children must be valid React elements.');
			}

			if (child.type === Step) {
				items.push(child);
				return null;
			}

			return child;
		});

		const stepCount: number = items.length;
		const clickable: boolean = !!onClickStep;
		const orientation: 'vertical' | 'horizontal' | undefined =
			isMobile && responsive ? 'vertical' : orientationProp;
		const isVertical: boolean = orientation === 'vertical';

		return (
			<StepperProvider
				value={{
					initialStep,
					orientation: 'horizontal',
					state,
					size: 'sm',
					responsive: true,
					checkIcon,
					errorIcon,
					onClickStep,
					clickable,
					stepCount,
					isVertical,
					variant: variant || 'circle',
					expandVerticalSteps,
					steps,
					scrollTracking,
					styles,
				}}
			>
				<div
					ref={ref}
					className={cn(
						'stepper__main-container',
						'flex w-full flex-wrap',
						stepCount === 1 ? 'justify-end' : 'justify-between',
						orientation === 'vertical' ? 'flex-col' : 'flex-row',
						variant === 'line' && orientation === 'horizontal' && 'gap-4',
						className,
						styles?.['main-container'],
					)}
					style={
						{
							'--step-icon-size':
								variables?.['--step-icon-size'] ||
								`${VARIABLE_SIZES[size || 'sm']}`,
							'--step-gap': variables?.['--step-gap'] || '8px',
						} as React.CSSProperties
					}
					{...rest}
				>
					<VerticalContent>{items}</VerticalContent>
				</div>

				{orientation === 'horizontal' && (
					<HorizontalContent>{items}</HorizontalContent>
				)}

				{footer}
			</StepperProvider>
		);
	},
);

interface VerticalContentProps {
	children: React.ReactNode;
}

const VerticalContent = ({
	children,
}: VerticalContentProps): React.JSX.Element => {
	const { activeStep } = useStepper();

	const childArr = React.Children.toArray(children);
	const stepCount = childArr.length;

	return (
		<Fragment>
			{React.Children.map(children, (child, i) => {
				const isCompletedStep =
					(React.isValidElement(child) &&
						(child.props as any).isCompletedStep) ??
					i < activeStep;
				const isLastStep = i === stepCount - 1;
				const isCurrentStep = i === activeStep;

				const stepProps = {
					index: i,
					isCompletedStep,
					isCurrentStep,
					isLastStep,
				};

				if (React.isValidElement(child)) {
					return React.cloneElement(child, stepProps);
				}
				return null;
			})}
		</Fragment>
	);
};

interface HorizontalContentProps {
	children: React.ReactNode;
}

const HorizontalContent = ({
	children,
}: HorizontalContentProps): React.JSX.Element | null => {
	const { activeStep } = useStepper();
	const childArr = React.Children.toArray(children);

	if (activeStep > childArr.length) {
		return null;
	}

	return (
		<>
			{React.Children.map(childArr[activeStep], (node) => {
				if (!React.isValidElement(node)) {
					return null;
				}

				return React.Children.map(
					// @ts-ignore
					node.props.children,
					(childNode): React.JSX.Element | any => childNode,
				);
			})}
		</>
	);
};

export { Stepper, Step, useStepper };
