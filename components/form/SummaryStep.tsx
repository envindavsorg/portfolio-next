import { StepperFormActions } from '@/components/form/Actions';
import { useFormData } from '@/components/form/Context';
import { Form, FormDescription } from '@/components/ui/Form';
import { useStepper } from '@/components/ui/Stepper';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/Table';
import { Smiley } from '@phosphor-icons/react/dist/ssr';
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
			description: 'Nous pouvons maintenant continuer.',
			duration: 5000,
			icon: <Smiley className="text-green-600 text-xl dark:text-green-300" />,
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-3">
				<FormDescription className="pt-2 text-sm">
					Voici un <span className="text-theme">récapitulatif</span> de vos
					informations. Si tout est correct, vous pouvez{' '}
					<span className="text-theme">continuer</span>, et sinon, vous pouvez
					revenir en arrière pour les modifier.
				</FormDescription>

				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Champ</TableHead>
							<TableHead className="text-right">Donnée</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="border">
						<TableRow>
							<TableCell className="font-medium">Votre nom</TableCell>
							<TableCell className="text-right font-bold text-sm text-theme">
								{formData.name}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">Votre prénom</TableCell>
							<TableCell className="text-right font-bold text-sm text-theme">
								{formData.surname}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">
								Votre adresse e-mail
							</TableCell>
							<TableCell className="text-right font-bold text-sm text-theme">
								{formData.mail}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">Votre message</TableCell>
							<TableCell className="text-right font-bold text-sm text-theme">
								{formData.content}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>

				<StepperFormActions formReset={form.reset} />
			</form>
		</Form>
	);
};
