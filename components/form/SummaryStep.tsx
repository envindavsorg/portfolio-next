import { StepperFormActions } from '@/components/form/Actions';
import { useFormData } from '@/components/form/Context';
import { Form, FormDescription } from '@/components/ui/Form';
import { useStepper } from '@/components/ui/Stepper';
import {
	ChatCircle,
	Envelope,
	Smiley,
	User,
} from '@phosphor-icons/react/dist/ssr';
import type React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const SummaryStep = () => {
	const { nextStep } = useStepper();
	const { formData } = useFormData();

	const form = useForm();

	const onSubmit = () => {
		nextStep();

		toast.success(`${formData.surname}, tout est bon pour vous ?`, {
			className: 'text-sm font-medium',
			duration: 5000,
			icon: <Smiley className="text-green-600 text-xl dark:text-green-300" />,
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-3">
				<FormDescription>
					Voici un <span className="text-theme">récapitulatif</span> de vos
					informations. Si tout est correct, vous pouvez{' '}
					<span className="text-theme">continuer</span>, et sinon, vous pouvez
					revenir en arrière pour les modifier.
				</FormDescription>
				<div className="border-border border-t-[0.5px]">
					<dl className="divide-y-[0.5px] divide-divide">
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="flex items-center gap-x-2 font-medium">
								<User className="size-5 text-theme" weight="duotone" />
								Nom
							</dt>
							<dd className="mt-1 font-bold font-mono leading-6 sm:col-span-2 sm:mt-0">
								{formData.name}
							</dd>
						</div>
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="flex items-center gap-x-2 font-medium">
								<User className="size-5 text-theme" weight="duotone" />
								Prénom
							</dt>
							<dd className="mt-1 font-bold font-mono leading-6 sm:col-span-2 sm:mt-0">
								{formData.surname}
							</dd>
						</div>
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="flex items-center gap-x-2 font-medium">
								<Envelope className="size-5 text-theme" weight="duotone" />
								E-mail
							</dt>
							<dd className="mt-1 font-bold font-mono leading-6 sm:col-span-2 sm:mt-0">
								{formData.mail}
							</dd>
						</div>
						<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt className="flex items-center gap-x-2 font-medium">
								<ChatCircle className="size-5 text-theme" weight="duotone" />
								Message
							</dt>
							<dd className="mt-1 max-w-[18rem] break-words font-bold font-mono leading-6 sm:col-span-2 sm:mt-0 sm:max-w-full">
								{formData.content}
							</dd>
						</div>
					</dl>
				</div>
				<StepperFormActions formReset={form.reset} />
			</form>
		</Form>
	);
};
