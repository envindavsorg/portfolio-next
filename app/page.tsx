import { Channels } from '@/components/Channels';
import { IosOgShellCard } from '@/components/iOS/IosOgShellCard';
import { CSSIcon } from '@/components/icons/CSS';
import { HTML5Icon } from '@/components/icons/HTML';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { ReactIcon } from '@/components/icons/React';
import { TailwindCSSIcon } from '@/components/icons/Tailwind';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import { VueIcon } from '@/components/icons/Vue';
import { WeFixIcon } from '@/components/icons/WeFix';
import { SocialLink } from '@/components/links/SocialLink';
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
	<h1 className="pt-12 font-bold font-geist-sans text-2xl transition-element md:text-3xl">
		<span className="sr-only">
			{env.NEXT_PUBLIC_NAME} {env.NEXT_PUBLIC_SURNAME}
		</span>
		<span aria-hidden="true" className="group relative block overflow-hidden">
			<span className="group-hover:-translate-y-full inline-block transition-all duration-300 ease-in-out">
				{`${env.NEXT_PUBLIC_NAME} ${env.NEXT_PUBLIC_SURNAME}`
					.split('')
					.map((letter, index) => (
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

const Home = (): React.JSX.Element => {
	const age: number = new Date().getFullYear() - 1994;
	const experience: number = new Date().getFullYear() - 2018;

	return (
		<>
			<AnimatedName />

			<div className="mt-8 space-y-4 leading-snug">
				<p className="leading-8">
					Bonjour, je m'appelle{' '}
					<span className="font-bold">{env.NEXT_PUBLIC_SURNAME}</span>, j'ai{' '}
					<span className="font-bold">{age} ans</span> et j'habite actuellement
					à <span className="font-bold">Paris</span>.
				</p>

				<p className="leading-8">
					Je suis un <span className="font-bold">développeur</span> et{' '}
					<span className="font-bold">designer web</span> depuis{' '}
					<span className="font-bold">{experience} ans</span>, passionné par la
					création d’applications <span>belles</span> et{' '}
					<span>fonctionnelles</span>, le design et le développement web.
				</p>
				<p className="leading-8">
					Je{' '}
					<Link href="/n/stack" className="font-bold text-theme underline">
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

			<div className="my-10 px-8 sm:px-16">
				<IosOgShellCard />
			</div>

			<div className="space-y-4 leading-snug">
				<p className="leading-8">
					En{' '}
					<span className="font-semibold">{experience} ans d'expérience</span>,
					j'ai eu l'occasion de travailler avec de nombreux langages et
					technologies, sur beaucoup de projets différents. J'ai commencé par le
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
				<p className="leading-8">
					J'ai ensuite appris à utiliser des frameworks plus complexes comme{' '}
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
			</div>

			<div className="mt-10 space-y-4 leading-snug md:space-y-6">
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
					</Link>
					, n'hésitez pas à me rendre une petite visite sur mes profils et
					pourquoi pas me laisser un message :)
				</p>
				<Channels />
			</div>
		</>
	);
};

export default Home;
