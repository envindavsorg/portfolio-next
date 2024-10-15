import { FadeInStagger } from '@/components/animations/FadeIn';
import { Sparkles } from '@/components/background/Sparkles';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { Link } from 'next-view-transitions';
import type React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => (
	<FadeInStagger className="mt-10" faster>
		<div className="flex min-h-screen w-full flex-col items-center justify-center">
			<Link
				href="/"
				aria-label="Retourner à la page d'accueil"
				className="absolute top-4 left-4 no-underline md:top-8 md:left-8"
			>
				<Button
					className="mt-3 flex w-max items-center gap-x-2"
					size="lg"
					variant="outline"
				>
					<ArrowLeft className="size-4 shrink-0" />
					Retour
				</Button>
			</Link>
			{children}
			<Sparkles density={50} />
		</div>
	</FadeInStagger>
);

export default Layout;
