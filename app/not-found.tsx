'use client';

import { ArrowLeftIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import PageParagraph from '@/components/text/PageParagraph';
import { Button } from '@/components/ui/Button';
import sadCat from '@/images/sad-cat.gif';

const NotFound = (): React.JSX.Element => {
	const router = useRouter();

	return (
		<div className="container flex min-h-screen max-w-3xl flex-col">
			<main className="flex flex-1 flex-col pt-30 pb-20 md:pt-38">
				<div className="flex flex-col-reverse gap-x-12 min-[530px]:flex-row min-[530px]:items-center min-[530px]:justify-center">
					<div className="flex flex-col gap-y-6">
						<FadeIn>
							<h2 className="font-extrabold font-hubot text-3xl md:text-4xl">
								Page introuvable
							</h2>
						</FadeIn>
						<FadeIn>
							<PageParagraph>
								Oups ! Cette page n’existe pas, peut-être avez-vous cliqué sur un ancien
								lien ou avez-vous fait une faute de frappe.
							</PageParagraph>
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
			</main>
		</div>
	);
};

export default NotFound;
