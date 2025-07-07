import type React from 'react';
import { memo } from 'react';
import { AnimatedLetters } from '@/components/text/AnimatedLetters';
import { cn } from '@/lib/utils';

interface TitleProps {
	children: React.ReactNode;
	name: string;
	title: string;
	isHome?: boolean;
	className?: string;
}

const PageTitle = memo(
	({
		children,
		name,
		title,
		isHome = false,
		className = '',
	}: TitleProps): React.JSX.Element => {
		const pSpacing: string = isHome ? 'mt-0.5' : 'fade-in mb-0.5';
		const pClasses: string = cn(
			'flex items-center gap-x-2 ps-5 font-hubot text-sm text-theme sm:text-base',
			pSpacing,
		);

		return (
			<div className="flex-1">
				{!isHome && <p className={pClasses}>{children}</p>}

				<h1
					className={cn(
						'font-extrabold font-hubot text-3xl md:text-4xl',
						isHome ? 'transition-element' : 'fade-in',
						className,
					)}
				>
					<span className="group relative block overflow-hidden">
						<span className="group-hover:-translate-y-full inline-block transition-all duration-300 ease-in-out">
							<AnimatedLetters text={name} />
						</span>
						<span className="absolute top-0 left-0 inline-block translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0">
							<AnimatedLetters text={title} />
						</span>
					</span>

					<span className="sr-only">{name}</span>
				</h1>

				{isHome && <p className={pClasses}>{children}</p>}
			</div>
		);
	},
);

PageTitle.displayName = 'PageTitle';

export default PageTitle;
