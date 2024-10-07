'use client';

import { Motion } from '@/components/motion/Motion';
import { variantsOne } from '@/components/motion/variants';
import { AnimatedNameLink } from '@/components/text/AnimatedName';
import { Button } from '@/components/ui/Button';
import sadCat from '@/gif/sad-sad-cat.gif';
import { ArrowLeft } from '@phosphor-icons/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type React from 'react';

export const metadata = {
	title: 'Page introuvable',
};

const NotFound = (): React.JSX.Element => {
	const router = useRouter();

	return (
		<>
			<h1 className="fade-in mb-0 pt-16 font-geist-sans font-medium text-lg lg:pt-12">
				Page introuvable
			</h1>

			<AnimatedNameLink />

			<Motion className="mt-10" variants={variantsOne} asChild>
				<div className="flex flex-col items-center gap-6 min-[530px]:flex-row">
					<div className="flex flex-col gap-y-3">
						<p className="leading-8">
							Oups ! Cette page n'existe pas, peut-être avez-vous cliqué sur un
							ancien lien ou avez-vous fait une faute de frappe. Veuillez
							réessayer…
						</p>
						<Button
							className="mt-3 flex w-max items-center gap-x-2"
							size="lg"
							variant="outline"
							onClick={() => router.back()}
						>
							<ArrowLeft className="size-4 shrink-0" />
							Revenir en arrière
						</Button>
					</div>

					<div className="mt-3 size-56 shrink-0 rounded-md sm:mt-0 min-[530px]:aspect-square min-[530px]:h-full min-[530px]:w-56">
						<Image
							src={sadCat}
							alt="Page introuvable"
							width={200}
							height={200}
							priority
							className="size-56 shrink-0 rounded-md min-[530px]:aspect-square min-[530px]:h-full min-[530px]:w-56"
						/>
					</div>
				</div>
			</Motion>
		</>
	);
};

export default NotFound;
