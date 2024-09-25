import { Channels } from '@/components/blocs/Channels';
import { HowToScroll } from '@/components/blocs/HowToScroll';
import { Stars } from '@/components/blocs/Stars';
import { CSSIcon } from '@/components/icons/CSS';
import { ExpressIcon } from '@/components/icons/Express';
import { FastifyIcon } from '@/components/icons/Fastify';
import { HTML5Icon } from '@/components/icons/HTML';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { MarkdownIcon } from '@/components/icons/Markdown';
import { MongoDBIcon } from '@/components/icons/MongoDB';
import { NextJSIcon } from '@/components/icons/Next';
import { ReactIcon } from '@/components/icons/React';
import { SassIcon } from '@/components/icons/Sass';
import { TailwindCSSIcon } from '@/components/icons/Tailwind';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import { VueIcon } from '@/components/icons/Vue';
import { WeFixIcon } from '@/components/icons/WeFix';
import { SocialLink } from '@/components/links/SocialLink';
import { Motion } from '@/components/motion/Motion';
import {
	variantsFive,
	variantsFour,
	variantsOne,
	variantsSix,
	variantsThree,
	variantsTwo,
} from '@/components/motion/variants';
import { AnimatedName } from '@/components/text/AnimatedName';
import { Badge } from '@/components/ui/Badge';
import { env } from '@/env/client';
import {
	ChatCircle,
	ChatsCircle,
	EnvelopeSimple,
	LinkedinLogo,
	Phone,
} from '@phosphor-icons/react/dist/ssr';
import { Link } from 'next-view-transitions';
import type React from 'react';

const age: number = new Date().getFullYear() - 1994;
const experience: number = new Date().getFullYear() - 2018;

const Home = (): React.JSX.Element => (
	<>
		<AnimatedName />

		<div className="mt-12 space-y-4 leading-snug">
			<Motion variants={variantsOne} asChild>
				<p className="leading-8">
					Bonjour, je m'appelle{' '}
					<span className="font-bold">{env.NEXT_PUBLIC_SURNAME}</span>, j'ai{' '}
					<span className="font-bold">{age} ans</span> et j'habite actuellement
					à <span className="font-bold">Paris</span>. Je suis un{' '}
					<span className="font-bold">développeur</span> et{' '}
					<span className="font-bold">designer web</span> depuis{' '}
					<span className="font-bold">{experience} ans</span>, passionné par la
					création d’applications <span>belles</span> et{' '}
					<span>fonctionnelles</span>, le design et le développement web.
				</p>
			</Motion>

			<Motion variants={variantsTwo} asChild>
				<p className="leading-8">
					Je{' '}
					<Link
						href="/work"
						aria-label="Entreprises pour lesquelles j'ai travaillé"
						className="font-bold text-theme underline"
					>
						travaille
					</Link>{' '}
					actuellement chez{' '}
					<Link
						href="https://wefix.net/"
						aria-label="Voir le site WeFix !"
						target="_blank"
					>
						<Badge>
							<WeFixIcon className="me-0.5 size-4 shrink-0 pb-0.5" />
							<span>WeFix</span>
						</Badge>
					</Link>{' '}
					une <span className="font-bold">entreprise leader</span> dans la
					réparation de smartphones, tablettes, ordinateurs portables et
					consoles de jeux.
				</p>
			</Motion>
		</div>

		<Motion className="mt-12" variants={variantsThree} asChild>
			<div className="flex gap-6">
				<SocialLink
					href={`https://www.linkedin.com/in/${env.NEXT_PUBLIC_WEBSITE_PREFIX}`}
					aria-label="Envoyez-moi un message sur LinkedIn"
					icon={LinkedinLogo}
					iconProps={{ weight: 'regular' }}
				/>
				<SocialLink
					href={`tel:${env.NEXT_PUBLIC_PHONE}`}
					aria-label="N'hésitez pas à m'appeler"
					icon={Phone}
					iconProps={{ weight: 'regular' }}
				/>
				<SocialLink
					href={`sms:${env.NEXT_PUBLIC_PHONE}`}
					aria-label="N'hésitez pas à m'envoyer un SMS"
					icon={ChatCircle}
					iconProps={{ weight: 'regular' }}
				/>
				<SocialLink
					href={`mailto:${env.NEXT_PUBLIC_EMAIL}`}
					aria-label="N'hésitez pas à m'envoyer un email"
					icon={EnvelopeSimple}
					iconProps={{ weight: 'regular' }}
				/>
				<SocialLink
					href="/"
					aria-label="N'hésitez pas à m'envoyer un message"
					icon={ChatsCircle}
					iconProps={{ weight: 'regular' }}
				/>
			</div>
		</Motion>

		<Motion className="mt-12" variants={variantsFour} asChild>
			<div className="space-y-4 leading-snug">
				<p className="leading-8">
					En{' '}
					<span className="font-semibold">{experience} ans d'expérience</span>,
					j'ai eu l'occasion de{' '}
					<Link
						href="/stack"
						aria-label="Technologies que j'utilise"
						className="font-bold text-theme underline"
					>
						travailler avec de nombreux langages et technologies
					</Link>
					, sur beaucoup de projets différents. J'ai commencé par le
					développement web avec{' '}
					<Badge>
						<HTML5Icon className="me-1 size-4 shrink-0 pb-0.5" />
						<span>HTML</span>
					</Badge>
					,{' '}
					<Badge>
						<CSSIcon className="me-1 size-4 shrink-0 pb-0.5" />
						<span>CSS</span>
					</Badge>{' '}
					et{' '}
					<Badge>
						<JavaScriptIcon className="me-1 size-4 shrink-0 pb-0.5" />
						<span>JavaScript</span>
					</Badge>
					, bien évidemment.
				</p>

				<div className="scrollbar-hide mt-2 flex h-14 w-full flex-row space-x-2 overflow-x-auto">
					<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800">
						<ReactIcon className="size-7 shrink-0" />
					</div>
					<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800">
						<NextJSIcon className="size-7 shrink-0" />
					</div>
					<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800">
						<VueIcon className="size-7 shrink-0" />
					</div>
					<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800">
						<JavaScriptIcon className="size-7 shrink-0" />
					</div>
					<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800">
						<TypeScriptIcon className="size-7 shrink-0" />
					</div>
					<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800">
						<TailwindCSSIcon className="size-7 shrink-0" />
					</div>
					<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800">
						<HTML5Icon className="size-7 shrink-0" />
					</div>
					<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800">
						<CSSIcon className="size-7 shrink-0" />
					</div>
					<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800">
						<SassIcon className="size-7 shrink-0" />
					</div>
					<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800">
						<MongoDBIcon className="size-7 shrink-0" />
					</div>
					<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800">
						<MarkdownIcon className="size-7 shrink-0" />
					</div>
					<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800">
						<ExpressIcon className="size-7 shrink-0" />
					</div>
					<div className="flex aspect-square items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 px-3 py-4 dark:border-neutral-700 dark:bg-neutral-800">
						<FastifyIcon className="size-7 shrink-0" />
					</div>
				</div>

				<HowToScroll />
			</div>
		</Motion>

		<Motion className="mt-12" variants={variantsFive} asChild>
			<div className="space-y-4 leading-snug">
				<p className="leading-8">
					J'ai ensuite{' '}
					<Link
						href="/stack"
						aria-label="Technologies que j'utilise"
						className="font-bold text-theme underline"
					>
						appris à utiliser
					</Link>{' '}
					des frameworks plus complexes comme{' '}
					<Link
						href="https://react.dev/"
						aria-label="Voir le site de React !"
						target="_blank"
					>
						<Badge>
							<ReactIcon className="me-1 size-4 shrink-0 pb-0.5" />
							<span>React</span>
						</Badge>
					</Link>{' '}
					et{' '}
					<Link
						href="https://vuejs.org/"
						aria-label="Voir le site de Vue !"
						target="_blank"
					>
						<Badge>
							<VueIcon className="me-1 size-4 shrink-0 pb-0.5" />
							<span>Vue.js</span>
						</Badge>
					</Link>
					, avec{' '}
					<Link
						href="https://www.typescriptlang.org/"
						aria-label="Voir le site de Vue !"
						target="_blank"
					>
						<Badge>
							<TypeScriptIcon className="me-1 size-4 shrink-0 pb-0.5" />
							<span>TypeScript</span>
						</Badge>
					</Link>{' '}
					en parallèle, me permettant de développer des applications plus
					robustes, belles et fonctionnelles. Pour le{' '}
					<span className="font-bold">design</span> et l'
					<span className="font-bold">UI</span> des mes applications, j'utilise{' '}
					<Link
						href="https://tailwindcss.com/"
						aria-label="Voir le site de Tailwind !"
						target="_blank"
					>
						<Badge>
							<TailwindCSSIcon className="me-1 size-4 shrink-0 pb-0.5" />
							<span>Tailwind CSS</span>
						</Badge>
					</Link>
					, qui est un framework incroyable de styling, puissant et modulaire.
				</p>

				<Stars className="mt-2" />
			</div>
		</Motion>

		<Motion className="mt-12" variants={variantsSix} asChild>
			<div className="space-y-4 leading-snug">
				<p className="leading-8">
					Je suis présent sur{' '}
					<Link
						href="https://linkedin.com/"
						className="font-medium underline hover:text-theme"
					>
						LinkedIn
					</Link>{' '}
					et sur{' '}
					<Link
						href="https://github.com/"
						className="font-medium underline hover:text-theme"
					>
						GitHub
					</Link>{' '}
					<Link
						href="/github"
						aria-label="Activité et statistiques de mon profil GitHub"
						className="font-bold text-theme underline"
					>
						(retrouvez toute mon activité et mes statistiques)
					</Link>
					, n'hésitez pas à me rendre une petite visite sur mes profils et
					pourquoi pas me laisser un message :)
				</p>

				<Channels className="mt-2" />
			</div>
		</Motion>
	</>
);

export default Home;
