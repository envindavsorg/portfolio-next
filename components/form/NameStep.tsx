import { StepperFormActions } from '@/components/form/Actions';
import { useFormData } from '@/components/form/Context';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { useStepper } from '@/components/ui/Stepper';
import { zodResolver } from '@hookform/resolvers/zod';
import { Smiley } from '@phosphor-icons/react/dist/ssr';
import type React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const FormNameSchema = z.object({
	name: z.string().min(3, {
		message: 'Entrez votre nom',
	}),
	surname: z.string().min(3, {
		message: 'Entrez votre prénom',
	}),
});

export const NameStep = () => {
	const { nextStep } = useStepper();
	const { formData, updateFormData } = useFormData();

	const form = useForm<z.infer<typeof FormNameSchema>>({
		resolver: zodResolver(FormNameSchema),
		defaultValues: {
			name: formData.name,
			surname: formData.surname,
		},
	});

	const onSubmit = (data: z.infer<typeof FormNameSchema>) => {
		updateFormData(data);
		nextStep();

		toast.success(`Bien enregistré, ${data.surname} !`, {
			description: 'Nous pouvons maintenant continuer.',
			duration: 5000,
			icon: <Smiley className="text-green-600 text-xl dark:text-green-300" />,
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-3">
				<FormDescription className="pt-2 text-sm">
					Veuillez entrer votre <span className="text-theme">nom</span> et votre{' '}
					<span className="text-theme">prénom</span> dans les champs ci-dessous.
					Afin que je sache qui vous êtes :)
				</FormDescription>
				<div className="grid grid-cols-2 gap-3">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nom</FormLabel>
								<FormControl>
									<Input placeholder="..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="surname"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Prénom</FormLabel>
								<FormControl>
									<Input placeholder="..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<StepperFormActions formReset={form.reset} />
			</form>
		</Form>
	);
};
