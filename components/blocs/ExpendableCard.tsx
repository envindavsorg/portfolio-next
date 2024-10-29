'use client';

import { Button } from '@/components/ui/Button';
import useOutsideClick from '@/hooks/useOutsideClick';
import { ShoppingCart } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { useEffect, useId, useRef, useState } from 'react';

export interface ExpendableCardItems {
	description: string;
	title: string;
	text?: string;
	image: StaticImageData;
	alt: string;
	link: string;
}

interface ExpendableCardProps {
	items: ExpendableCardItems[];
	className?: string;
	grid: string;
}

export const ExpandableCards = ({
	items,
	className,
	grid,
}: ExpendableCardProps) => {
	const [active, setActive] = useState<(typeof items)[number] | boolean | null>(
		null,
	);
	const id: string = useId();
	const ref: React.RefObject<HTMLDivElement | null> =
		useRef<HTMLDivElement>(null);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setActive(false);
			}
		};

		if (active && typeof active === 'object') {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [active]);

	useOutsideClick(ref, () => setActive(null));

	return (
		<div className={className}>
			<AnimatePresence>
				{active && typeof active === 'object' && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-10 size-full backdrop-blur-md"
					/>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{active && typeof active === 'object' ? (
					<div className="fixed inset-0 z-[100] grid place-items-center">
						<motion.div
							layoutId={`card-${active.title}-${id}`}
							ref={ref}
							className="flex size-full h-fit max-w-[400px] flex-col overflow-hidden rounded-xl border border-border border-dashed bg-background"
						>
							<motion.div
								className="relative p-4"
								layoutId={`image-${active.title}-${id}`}
							>
								<Image
									priority
									src={active.image}
									alt={active.title}
									className="aspect-square w-full rounded-xl border border-border border-dashed object-cover object-center"
								/>
							</motion.div>

							<div className="flex flex-col px-4 pb-4">
								<motion.h3
									layoutId={`title-${active.title}-${id}`}
									className="font-bold text-lg"
								>
									{active.title}
								</motion.h3>
								<motion.p
									layoutId={`description-${active.description}-${id}`}
									className="text-sm"
								>
									{active.description}{' '}
									{active.text ? (
										<span className="text-xs">({active.text})</span>
									) : null}
								</motion.p>
							</div>

							<div className="grid grid-cols-3 gap-x-3 px-4 pb-4">
								<motion.div
									layout
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="col-span-2"
								>
									<Button
										variant="outline"
										size="lg"
										asChild
										key={`button-${active.title}-${id}`}
										className="w-full"
									>
										<Link
											href={active.link}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-x-2"
										>
											<p className="font-bold text-foreground text-sm">
												{active.alt}
											</p>
											<ShoppingCart
												className="text-theme text-xl"
												weight="duotone"
											/>
										</Link>
									</Button>
								</motion.div>

								<motion.div
									layout
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0, transition: { duration: 0.05 } }}
									onClick={() => setActive(null)}
									className="col-span-1"
								>
									<Button
										variant="outline"
										size="lg"
										asChild
										key={`button-${active.title}-${id}`}
										className="w-full"
									>
										<p className="font-bold text-foreground text-sm">Fermer</p>
									</Button>
								</motion.div>
							</div>
						</motion.div>
					</div>
				) : null}
			</AnimatePresence>

			<div className={grid}>
				{items.map((card: ExpendableCardItems, idx: number) => {
					const { description, title, image } = card;

					return (
						<motion.div
							layoutId={`card-${title}-${id}`}
							key={`${title}-${idx}`}
							onClick={() => setActive(card)}
							className="flex cursor-pointer flex-col"
						>
							<div className="flex w-full flex-col gap-3">
								<motion.div layoutId={`image-${title}-${id}`}>
									<Image
										src={image}
										alt={title}
										className="aspect-square w-full rounded-md object-cover object-center"
									/>
								</motion.div>
								<div className="flex flex-col items-center justify-center gap-y-1">
									<motion.h3
										layoutId={`title-${title}-${id}`}
										className="w-full truncate text-center font-bold text-sm"
									>
										{title}
									</motion.h3>
									<motion.p
										layoutId={`description-${description}-${id}`}
										className="text-center text-xs"
									>
										{description}
									</motion.p>
								</div>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
};
