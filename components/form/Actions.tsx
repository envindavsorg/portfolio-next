'use client';

import { useFormData } from '@/components/form/Context';
import { Button } from '@/components/ui/Button';
import { useStepper } from '@/components/ui/Stepper';
import { RocketLaunch, SmileySad, Spinner } from '@phosphor-icons/react';
import type React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

interface StepperFormActionsProps {
	formReset: () => void;
}

export const StepperFormActions = (props: StepperFormActionsProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const {
		prevStep,
		resetSteps,
		isDisabledStep,
		hasCompletedAllSteps,
		isLastStep,
	} = useStepper();

	const { formData, resetFormData } = useFormData();
	const handleSubmit = async (): Promise<void> => {
		setIsLoading(true);

		const response = await fetch('/api/send', {
			method: 'POST',
			body: JSON.stringify({
				name: formData.name,
				surname: formData.surname,
				mail: formData.mail,
				content: formData.content,
			}),
		});

		toast(
			response.ok
				? 'Le message a bien été envoyé !'
				: 'Une erreur est survenue !',
			{
				className: 'text-sm font-medium',
				duration: 5000,
				icon: response.ok ? (
					<RocketLaunch className="text-green-600 text-xl dark:text-green-300" />
				) : (
					<SmileySad className="text-red-600 text-xl dark:text-red-300" />
				),
			},
		);

		if (response.ok) {
			props.formReset();
			resetFormData();
			resetSteps();
		}

		setIsLoading(false);
	};

	return (
		<div className="flex w-full justify-end gap-2">
			{hasCompletedAllSteps ? (
				<Button size="sm" type="button" onClick={resetSteps}>
					Envoyer
				</Button>
			) : (
				<>
					<Button
						disabled={isDisabledStep}
						onClick={prevStep}
						size="sm"
						variant="outline"
						type="button"
					>
						Précédent
					</Button>
					<Button
						size="sm"
						type={isLastStep ? 'button' : 'submit'}
						onClick={isLastStep ? handleSubmit : undefined}
						disabled={isLastStep && isLoading}
					>
						{isLastStep ? (
							isLoading ? (
								<Spinner className="animate-spin text-xl" />
							) : (
								'Envoyer'
							)
						) : (
							'Suivant'
						)}
					</Button>
				</>
			)}
		</div>
	);
};
