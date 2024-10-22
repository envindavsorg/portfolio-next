import RenderingInNextClient from '@/snippets/rendering-in-next/client.mdx';
import RenderingInNextServer from '@/snippets/rendering-in-next/server.mdx';
import { Lightbulb } from '@phosphor-icons/react/dist/ssr';
import type React from 'react';

export const Rendering = (): React.JSX.Element => (
	<>
		<p className="leading-8">
			Comprendre la différence entre les composants{' '}
			<span className="font-bold text-theme">client</span> et{' '}
			<span className="font-bold text-theme">serveur</span> est crucial. Par
			défaut, les pages sont des composants{' '}
			<span className="font-bold">serveur</span>, mais vous pouvez inclure des
			composants <span className="font-bold">client</span> à l'intérieur pour
			l'interactivité.
		</p>

		<div className="my-6 flex items-start space-x-4">
			<div className="relative mt-1 ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-theme text-white ring-2 ring-theme">
				<Lightbulb
					className="size-3 overflow-visible text-background"
					weight="bold"
				/>
				<div className="absolute top-full left-[0.46875rem] mt-1 h-[1.375rem] w-px rounded-full bg-theme" />
			</div>
			<p className="m-0 flex-1 font-bold text-base text-theme">
				Exemple de composant client en Next.js
			</p>
		</div>
		<RenderingInNextClient />

		<div className="my-6 flex items-start space-x-4">
			<div className="relative mt-1 ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-theme text-white ring-2 ring-theme">
				<Lightbulb
					className="size-3 overflow-visible text-background"
					weight="bold"
				/>
				<div className="absolute top-full left-[0.46875rem] mt-1 h-[1.375rem] w-px rounded-full bg-theme" />
			</div>
			<p className="m-0 flex-1 font-bold text-base text-theme">
				Exemple de composant serveur en Next.js
			</p>
		</div>
		<RenderingInNextServer />
	</>
);
