import { Channels } from '@/components/Channels';
import { Cards } from '@/components/cards';
import { CSSIcon } from '@/components/icons/CSS';
import { HTML5Icon } from '@/components/icons/HTML';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { ReactIcon } from '@/components/icons/React';
import { TailwindCSSIcon } from '@/components/icons/Tailwind';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import { VueIcon } from '@/components/icons/Vue';
import { WeFixIcon } from '@/components/icons/WeFix';
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

const AnimatedName = (): React.JSX.Element => (
	<h1 className="pt-12 font-bold text-2xl transition-element md:text-3xl">
		<span className="sr-only">{env.NEXT_PUBLIC_FULL_NAME}</span>
		<span aria-hidden="true" className="group relative block overflow-hidden">
			<span className="group-hover:-translate-y-full inline-block transition-all duration-300 ease-in-out">
				{env.NEXT_PUBLIC_FULL_NAME.split('').map((letter, index) => (
					<span
						key={index}
						className="inline-block"
						style={{ transitionDelay: `${index * 25}ms` }}
					>
						{letter === ' ' ? '\u00A0' : letter}
					</span>
				))}
			</span>
			<span className="absolute top-0 left-0 inline-block translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0">
				{env.NEXT_PUBLIC_GITHUB_USERNAME.split('').map(
					(letter: string, index: number) => (
						<span
							key={index}
							className="inline-block"
							style={{ transitionDelay: `${index * 25}ms` }}
						>
							{letter}
						</span>
					),
				)}
			</span>
		</span>
	</h1>
);

const SocialLink = ({
	icon: Icon,
	iconProps = {},
	...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
	icon: React.ComponentType<{ className?: string }>;
	iconProps?: Record<string, any>;
}): React.JSX.Element => (
	<Link className="group -m-1 p-1" {...props}>
		<Icon
			className="size-6 fill-switch transition group-hover:fill-theme"
			{...iconProps}
		/>
	</Link>
);

const Home = (): React.JSX.Element => {
	const age: number = new Date().getFullYear() - 1994;
	const experience: number = new Date().getFullYear() - 2018;

	return (
		<>
			<AnimatedName />
			<div className="mt-8 space-y-4 text-gray-800 leading-snug">
				<p className="leading-7">
					Bonjour, je m'appelle{' '}
					<span className="font-bold text-switch">
						{env.NEXT_PUBLIC_SURNAME}
					</span>
					, j'ai <span className="font-bold text-switch">{age} ans</span> et
					j'habite actuellement à{' '}
					<span className="font-bold text-switch">Paris</span>.
				</p>

				<p className="leading-7">
					<Link href="/n/stack" className="text-blue-500 hover:text-blue-700">
						Next.js
					</Link>
				</p>

				<p className="leading-7">
					Je suis un <span className="font-bold text-switch">développeur</span>{' '}
					et <span className="font-bold text-switch">designer web</span> depuis{' '}
					<span className="font-bold text-switch">{experience} ans</span>,
					passionné par la création d’applications <span>belles</span> et{' '}
					<span>fonctionnelles</span>, le design et le développement web.
				</p>
				<p className="leading-7">
					Je <span className="font-bold text-switch">travaille</span>{' '}
					actuellement chez{' '}
					<Link
						href="https://wefix.net/"
						aria-label="Voir le site WeFix !"
						target="_blank"
					>
						<Badge className="inline-block">
							<WeFixIcon className="inline-flex size-4 shrink-0" /> WeFix
						</Badge>
					</Link>{' '}
					une <span className="font-bold text-switch">entreprise leader</span>{' '}
					dans la réparation de smartphones, tablettes, ordinateurs portables et
					consoles de jeux.
				</p>

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
			</div>

			<hr />
			<div className="mt-10 space-y-4 text-gray-800 leading-snug">
				<p className="leading-7">
					En{' '}
					<span className="font-semibold text-switch">
						{experience} ans d'expérience
					</span>
					, j'ai eu l'occasion de travailler avec de nombreux langages et
					technologies, sur beaucoup de projets différents. J'ai commencé par le
					développement web avec{' '}
					<Badge className="inline-block">
						<HTML5Icon className="me-1 inline-flex size-4 shrink-0" /> HTML
					</Badge>
					,{' '}
					<Badge className="inline-block">
						<CSSIcon className="me-1 inline-flex size-4 shrink-0" /> CSS
					</Badge>{' '}
					et{' '}
					<Badge className="inline-block">
						<JavaScriptIcon className="me-1 inline-flex size-4 shrink-0" />{' '}
						JavaScript
					</Badge>
					, bien évidemment.
				</p>
				<p className="leading-7">
					J'ai ensuite appris à utiliser des frameworks plus complexes comme{' '}
					<Link
						href="https://react.dev/"
						aria-label="Voir le site de React !"
						target="_blank"
					>
						<Badge className="inline-block">
							<ReactIcon className="me-1 inline-flex size-4 shrink-0" /> React
						</Badge>
					</Link>{' '}
					et{' '}
					<Link
						href="https://vuejs.org/"
						aria-label="Voir le site de Vue !"
						target="_blank"
					>
						<Badge className="inline-block">
							<VueIcon className="me-1 inline-flex size-4 shrink-0" /> Vue.js
						</Badge>
					</Link>
					, avec{' '}
					<Link
						href="https://www.typescriptlang.org/"
						aria-label="Voir le site de Vue !"
						target="_blank"
					>
						<Badge className="inline-block">
							<TypeScriptIcon className="me-1 inline-flex size-4 shrink-0" />{' '}
							TypeScript
						</Badge>
					</Link>{' '}
					en parallèle, me permettant de développer des applications plus
					robustes, belles et fonctionnelles. Pour le{' '}
					<span className="font-bold text-switch">design</span> et l'
					<span className="font-bold text-switch">UI</span> des mes
					applications, j'utilise{' '}
					<Link
						href="https://tailwindcss.com/"
						aria-label="Voir le site de Tailwind !"
						target="_blank"
					>
						<Badge className="inline-block">
							<TailwindCSSIcon className="me-1 inline-flex size-4 shrink-0" />{' '}
							Tailwind CSS
						</Badge>
					</Link>
					, qui est un framework incroyable de styling, puissant et modulaire.
				</p>
			</div>

			<div className="mt-10 space-y-4 text-gray-800 leading-snug md:space-y-6">
				<p className="leading-7">
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
					</Link>
					, n'hésitez pas à me rendre une petite visite et pourquoi pas me
					laisser un message :)
				</p>
				<Channels />
			</div>
			<Cards />
		</>
	);
};

export default Home;
