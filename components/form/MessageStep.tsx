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
import { useStepper } from '@/components/ui/Stepper';
import { Textarea } from '@/components/ui/Textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Smiley } from '@phosphor-icons/react/dist/ssr';
import type React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const FormMessageSchema = z.object({
	content: z
		.string()
		.min(5, {
			message: 'Veuillez entrer votre message',
		})
		.max(500, {
			message: 'Entrez un message de maximum 500 caractères',
		}),
});

export const MessageStep = () => {
	const { nextStep } = useStepper();
	const { formData, updateFormData } = useFormData();

	const form = useForm<z.infer<typeof FormMessageSchema>>({
		resolver: zodResolver(FormMessageSchema),
		defaultValues: {
			content: formData.content,
		},
	});

	const onSubmit = (data: z.infer<typeof FormMessageSchema>) => {
		updateFormData(data);
		nextStep();

		toast.success(`Joli message, je suppose !`, {
			description: 'Nous pouvons maintenant continuer.',
			duration: 5000,
			icon: <Smiley className="text-green-600 text-xl dark:text-green-300" />,
		});
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-3">
				<FormDescription className="pt-2 text-sm">
					Veuillez entrer votre <span className="text-theme">message</span> dans
					le champ ci-dessous.
				</FormDescription>
				<div className="grid grid-cols-2 gap-3">
					<div className="col-span-2">
						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Votre message :</FormLabel>
									<FormControl>
										<Textarea placeholder="..." maxLength={500} {...field} />
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
