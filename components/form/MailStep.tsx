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

const FormMailSchema = z.object({
	mail: z.string().email({ message: 'Entrez une adresse e-mail valide' }),
});

export const MailStep = () => {
	const { nextStep } = useStepper();
	const { formData, updateFormData } = useFormData();

	const form = useForm<z.infer<typeof FormMailSchema>>({
		resolver: zodResolver(FormMailSchema),
		defaultValues: {
			mail: formData.mail,
		},
	});

	const onSubmit = (data: z.infer<typeof FormMailSchema>) => {
		updateFormData(data);
		nextStep();

		toast.success(`Adresse e-mail enregistrée ! Continuons :)`, {
			className: 'text-sm font-medium',
			duration: 5000,
			icon: <Smiley className="text-green-600 text-xl dark:text-green-300" />,
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-3">
				<FormDescription>
					Veuillez entrer votre{' '}
					<span className="text-theme">adresse e-mail</span> dans le champ
					ci-dessous.
				</FormDescription>
				<div className="grid grid-cols-2 gap-3">
					<div className="col-span-2">
						<FormField
							control={form.control}
							name="mail"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Adresse e-mail :</FormLabel>
									<FormControl>
										<Input placeholder="..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				<StepperFormActions formReset={form.reset} />
			</form>
		</Form>
	);
};
