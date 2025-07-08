'use client';

import { ArrowLeftIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { Suspense } from 'react';
import { FadeIn, FadeInStagger } from '@/components/animations/FadeIn';
import { Sparkles } from '@/components/background/Sparkles';
import { Button } from '@/components/ui/Button';
import sadCat from '@/gif/sad-cat.gif';

const NotFound = (): React.JSX.Element => {
	const router = useRouter();

	return (
		<FadeInStagger faster>
			<div className="flex min-h-screen w-full flex-col items-center justify-center">
				<div className="w-full max-w-2xl px-6 sm:px-3">
					<div className="flex flex-col-reverse gap-x-12 min-[530px]:flex-row min-[530px]:items-center min-[530px]:justify-center">
						<div className="flex flex-col gap-y-1">
							<FadeIn>
								<h1 className="mb-0 font-geist-sans font-medium text-lg">
									Oups, cette page n’existe pas !
								</h1>
							</FadeIn>
							<FadeIn>
								<h2 className="mb-6 flex font-bold font-geist-sans text-3xl text-theme no-underline md:text-4xl">
									Page introuvable
								</h2>
							</FadeIn>
							<FadeIn>
								<p className="leading-8">
									<span className="font-bold">Oups !</span> Cette page n’existe pas,
									peut-être avez-vous cliqué sur un{' '}
									<span className="font-bold">ancien lien</span> ou avez-vous fait une{' '}
									<span className="font-bold">faute de frappe</span>.
								</p>
							</FadeIn>
							<FadeIn>
								<Button
									className="mt-3 flex w-max items-center gap-x-2"
									size="lg"
									variant="outline"
									onClick={() => router.back()}
								>
									<ArrowLeftIcon className="size-4 shrink-0" />
									Revenir en arrière
								</Button>
							</FadeIn>
						</div>

						<FadeIn>
							<div className="mb-10 size-40 shrink-0 rounded-md sm:mb-0 min-[530px]:aspect-square min-[530px]:h-full min-[530px]:w-56">
								<Image
									src={sadCat}
									alt="Page introuvable"
									width={200}
									height={200}
									priority
									className="size-40 shrink-0 rounded-md min-[530px]:aspect-square min-[530px]:h-full min-[530px]:w-56"
								/>
							</div>
						</FadeIn>
					</div>
				</div>

				<Suspense>
					<Sparkles density={30} />
				</Suspense>
			</div>
		</FadeInStagger>
	);
};

export default NotFound;
