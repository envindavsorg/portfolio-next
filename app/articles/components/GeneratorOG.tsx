'use client';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Spinner } from '@/components/ui/Spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	ArrowRight,
	Image as ImageIcon,
	Spinner as SpinnerIcon,
	TextAa,
} from '@phosphor-icons/react';
import confetti from 'canvas-confetti';
import Image from 'next/image';
import type React from 'react';
import { useState } from 'react';
import {
	type ControllerFieldState,
	type ControllerRenderProps,
	type UseFormStateReturn,
	useForm,
} from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
	title: z.string().min(2, {
		message: "J'ai besoin d'un titre pour générer l'image !",
	}),
});

interface GeneratorOGProps {
	name: string;
}

export const GeneratorOG = ({ name }: GeneratorOGProps) => {
	const [imageUrl, setImageUrl] = useState(
		`https://www.cuzeac-florin.app/og?title=${encodeURIComponent(name)}`,
	);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			title: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof FormSchema>): Promise<void> => {
		setIsLoading(true);

		try {
			const encodedTitle: string = encodeURIComponent(data.title);
			const url: string = `https://www.cuzeac-florin.app/og?title=${encodedTitle}`;
			setImageUrl(url);

			await new Promise((resolve) => setTimeout(resolve, 1000));
			confetti();
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="my-6 flex flex-col gap-y-3 rounded-md border border-neutral-200 p-4 dark:border-neutral-700">
			<div className="flex items-center gap-x-6 sm:mb-3 sm:gap-x-6">
				<TextAa className="size-8 shrink-0" weight="bold" />
				<ArrowRight className="size-4 shrink-0" weight="regular" />
				<ImageIcon className="size-8 shrink-0" weight="bold" />
			</div>
			<Form {...form}>
				<p className="text-sm">
					Essayez avec un autre{' '}
					<span className="font-bold text-theme">titre</span> :
				</p>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="-mt-1 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
				>
					<FormField
						control={form.control}
						name="title"
						render={({
							field,
						}: {
							field: ControllerRenderProps<{ title: string }, 'title'>;
							fieldState: ControllerFieldState;
							formState: UseFormStateReturn<{ title: string }>;
						}) => (
							<FormItem className="flex-1">
								<FormControl>
									<Input placeholder="..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<button
						className="ms-auto h-11 w-fit rounded-md border border-border bg-background px-3 py-2"
						type="submit"
					>
						{isLoading ? (
							<SpinnerIcon className="animate-spin text-foreground text-lg" />
						) : (
							<span className="font-bold text-sm">Générer l’image</span>
						)}
					</button>
				</form>
			</Form>

			{isLoading && <Spinner className="h-36" />}
			{imageUrl && !isLoading && (
				<div className="mt-3 size-full rounded-md border border-neutral-200 px-1 py-3 dark:border-neutral-700">
					<Image
						className="size-full"
						src={imageUrl}
						alt={name}
						width={200}
						height={200}
					/>
				</div>
			)}
		</div>
	);
};
