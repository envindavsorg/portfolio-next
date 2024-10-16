import type { ArticleWithSlug } from '@/lib/articles';
import { formatDate } from '@/lib/formatDate';
import { cn } from '@/lib/utils';
import { LineVertical } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import type React from 'react';

interface ArticleProps {
	isLanding?: boolean;
	isBlog?: boolean;
	article: ArticleWithSlug;
	mousePosition: {
		x: number;
		y: number;
	};
}

export const Article = ({
	isLanding,
	isBlog,
	article,
	mousePosition,
}: ArticleProps): React.JSX.Element => {
	const { date, slug, title, image, readingTimeShort } = article;
	const { x, y } = mousePosition;

	const imageHeight: number = 100;
	const imageWidth: number = 200;
	const imageOffset: number = 24;

	return (
		<li className="group py-3 transition-opacity first:pt-0 last:pb-0">
			<Link
				href={`/articles/${slug}`}
				aria-label={title}
				className="no-underline"
			>
				<div className="transition-opacity">
					{isLanding && (
						<motion.div
							animate={{
								top: y - imageHeight - imageOffset,
								left: x - imageWidth / 2,
							}}
							initial={false}
							transition={{
								ease: 'easeOut',
							}}
							style={{
								width: imageWidth,
								height: imageHeight,
							}}
							className="pointer-events-none absolute z-10 hidden items-center justify-center overflow-hidden rounded-md border border-neutral-200 sm:group-hover:flex dark:border-neutral-700"
						>
							<Image
								src={image}
								alt={title}
								width={imageWidth}
								height={imageHeight}
								className="size-56 object-contain object-center"
							/>
						</motion.div>
					)}

					<div className="flex items-center justify-between gap-6">
						<div
							className={cn(
								'flex gap-2',
								isLanding &&
									'flex-col-reverse md:flex-row md:items-center md:gap-9',
								isBlog && 'flex-col-reverse',
							)}
						>
							<div
								className={cn(
									'flex items-center',
									isLanding && 'gap-1',
									isBlog && 'gap-1.5 min-[530px]:gap-3',
								)}
							>
								<h3
									className={cn(
										'shrink-0 font-medium text-theme text-xs tracking-tight min-[530px]:text-sm',
										isLanding && 'md:w-32',
									)}
								>
									{formatDate(date)}
								</h3>
								<LineVertical
									className={cn('size-4', isLanding && 'md:hidden')}
								/>
								<h3
									className={cn(
										'shrink-0 font-extrabold text-foreground text-xs tracking-tight min-[530px]:text-sm',
										isLanding && 'md:hidden md:w-32',
									)}
								>
									{readingTimeShort}
								</h3>
							</div>
							<span
								className={cn(
									'font-bold font-geist-sans leading-tight',
									isBlog && 'text-lg min-[530px]:text-xl',
								)}
							>
								{title}
							</span>
						</div>

						<div
							className={cn(
								'relative aspect-square size-20 min-w-20 items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-700',
								isLanding && 'flex md:hidden',
								isBlog && 'flex',
							)}
						>
							<Image
								src={image}
								alt={title}
								fill
								className="rounded-md object-cover object-center"
							/>
						</div>
					</div>
				</div>
			</Link>
		</li>
	);
};
