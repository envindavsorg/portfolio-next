import DataFetchingInNextBad from '@/snippets/data-fetch-in-next/bad.mdx';
import DataFetchingInNextGood from '@/snippets/data-fetch-in-next/good.mdx';
import { Check, X } from '@phosphor-icons/react/dist/ssr';
import type React from 'react';

export const DataFetching = (): React.JSX.Element => (
	<>
		<p className="leading-8">
			J'évite d'utiliser des gestionnaires de route{' '}
			<span className="font-bold text-theme">API</span> pour récupérer des
			données dans mes composants serveur. À la place, je{' '}
			<span className="font-bold">récupère</span> les données directement dans
			mes composants serveur. Cette approche tire parti des{' '}
			<span className="font-bold">optimisations</span> et du{' '}
			<span className="font-bold">caching</span> de{' '}
			<span className="font-bold text-theme">Next.js</span>.
		</p>

		<div className="my-6 flex items-start space-x-4">
			<div className="relative mt-1 ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-white ring-2 ring-red-600">
				<X className="size-3 overflow-visible text-white" weight="bold" />
				<div className="absolute top-full left-[0.46875rem] mt-1 h-[1.375rem] w-px rounded-full bg-red-600" />
			</div>
			<p className="m-0 flex-1 font-bold text-base text-red-600 dark:text-red-300">
				Ne pas utiliser des gestionnaires de route API !
			</p>
		</div>
		<DataFetchingInNextBad />

		<p className="mt-6 leading-8">
			À la place, je <span className="font-bold">récupère</span> les données
			directement dans mes composants serveur. Cette approche tire parti des{' '}
			<span className="font-bold">optimisations</span> et du{' '}
			<span className="font-bold">caching</span> de{' '}
			<span className="font-bold text-theme">Next.js</span>. Pour une logique de
			récupération réutilisable, je crée des
			<span className="font-bold">actions serveur</span> et je les importent là
			où c'est nécessaire. Cette approche permet de réduire et de rendre le code
			plus lisible.
		</p>

		<div className="my-6 flex items-start space-x-4">
			<div className="relative mt-1 ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-white ring-2 ring-green-600">
				<Check className="size-3 overflow-visible text-white" weight="bold" />
				<div className="absolute top-full left-[0.46875rem] mt-1 h-[1.375rem] w-px rounded-full bg-green-600" />
			</div>
			<p className="m-0 flex-1 font-bold text-base text-green-600 dark:text-green-300">
				Utiliser des actions serveur !
			</p>
		</div>
		<DataFetchingInNextGood />
	</>
);
