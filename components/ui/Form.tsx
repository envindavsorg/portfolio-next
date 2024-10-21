import { cn } from '@/lib/utils';
import type * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import React, { forwardRef, useContext, useId } from 'react';
import {
	Controller,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
	FormProvider,
	useFormContext,
} from 'react-hook-form';
import { Label } from './Label';

const Form = FormProvider;

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue,
);

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>): React.JSX.Element => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

const useFormField = () => {
	const fieldContext = useContext(FormFieldContext);
	const itemContext = useContext(FormItemContext);
	const { getFieldState, formState } = useFormContext();

	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error('useFormField should be used within <FormField>');
	}

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
};

type FormItemContextValue = {
	id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue,
);

const FormItem = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(
	(
		{ className, ...props }: React.HTMLAttributes<HTMLDivElement>,
		ref,
	): React.JSX.Element => {
		const id = useId();

		return (
			<FormItemContext.Provider value={{ id }}>
				<div ref={ref} className={cn('space-y-1', className)} {...props} />
			</FormItemContext.Provider>
		);
	},
);
FormItem.displayName = 'FormItem';

const FormLabel = forwardRef<
	React.ComponentRef<typeof LabelPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(
	(
		{ className, ...props }: React.HTMLAttributes<HTMLLabelElement>,
		ref,
	): React.JSX.Element => {
		const { formItemId } = useFormField();

		return (
			<Label ref={ref} className={className} htmlFor={formItemId} {...props} />
		);
	},
);
FormLabel.displayName = 'FormLabel';

const FormControl = forwardRef<
	React.ComponentRef<typeof Slot>,
	React.ComponentPropsWithoutRef<typeof Slot>
>(
	(
		{ ...props }: React.ComponentPropsWithoutRef<typeof Slot>,
		ref,
	): React.JSX.Element => {
		const { error, formItemId, formDescriptionId, formMessageId } =
			useFormField();

		return (
			<Slot
				ref={ref}
				id={formItemId}
				aria-describedby={
					error
						? `${formDescriptionId} ${formMessageId}`
						: `${formDescriptionId}`
				}
				aria-invalid={!!error}
				{...props}
			/>
		);
	},
);
FormControl.displayName = 'FormControl';

const FormDescription = forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(
	(
		{ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>,
		ref,
	): React.JSX.Element => {
		const { formDescriptionId } = useFormField();

		return (
			<p ref={ref} id={formDescriptionId} className={className} {...props} />
		);
	},
);
FormDescription.displayName = 'FormDescription';

const FormMessage = forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(
	(
		{
			className,
			children,
			...props
		}: React.HTMLAttributes<HTMLParagraphElement>,
		ref,
	): React.JSX.Element | null => {
		const { error, formMessageId } = useFormField();
		const body = error ? String(error?.message) : children;

		if (!body) {
			return null;
		}

		return (
			<p
				ref={ref}
				id={formMessageId}
				className={cn(
					'font-medium text-red-600 text-xs dark:text-red-300',
					className,
				)}
				{...props}
			>
				{body}
			</p>
		);
	},
);
FormMessage.displayName = 'FormMessage';

export {
	useFormField,
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	FormField,
};
