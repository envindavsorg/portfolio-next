import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import type React from 'react';
import { FadeIn, FadeInStagger } from '@/components/animations/FadeIn';
import { ContactForm } from '@/components/form/ContactForm';
import { SocialLink } from '@/components/links/SocialLink';
import PageTitle from '@/components/text/PageTitle';
import { Separator } from '@/components/ui/Separator';
import { name, title } from '@/resources/config';
import { contact } from '@/resources/contact';
import { absoluteUrl } from '@/site/metadata';

export const generateMetadata = async (): Promise<Metadata> => {
	const cookie = await cookies();
	const type: string = 'image';
	const mode: string | undefined = cookie.get('theme')?.value;
	const title: string = 'Me contacter';

	return {
		title,
		description:
			"N'hésitez pas à me contacter si vous avez des questions ou des suggestions concernant mon site, mon portfolio, ou mes projets. Je suis disponible pour répondre à toutes vos demandes.",
		openGraph: {
			images: [absoluteUrl(`/api/og?heading=${title}&type=${type}&mode=${mode}`)],
		},
		alternates: {
			canonical: '/contact',
		},
	};
};

const ContactPage = (): React.JSX.Element => (
	<>
		<PageTitle name={name} title={title}>
			n'hésitez pas à me contacter
		</PageTitle>

		<FadeInStagger className="mt-10" faster>
			<FadeIn>
				<p className="leading-8">
					N'hésitez pas à <span className="font-bold text-theme">me contacter</span> si
					vous avez des <span className="font-bold">questions</span> ou des{' '}
					<span className="font-bold">suggestions</span> concernant mon{' '}
					<span className="font-bold">site</span>, mon{' '}
					<span className="font-bold">portfolio</span>, ou mes{' '}
					<span className="font-bold">projets</span>. Je suis disponible pour{' '}
					<span className="font-bold text-theme">répondre</span> à toutes vos demandes.
				</p>
			</FadeIn>

			<FadeIn className="mt-6">
				<div className="flex gap-6">
					{contact.map(({ description, url, icon }, idx) => (
						<SocialLink
							key={`${idx}-contact`}
							href={url}
							aria-label={description}
							icon={icon}
							iconProps={{ weight: 'regular' }}
						/>
					))}
				</div>
			</FadeIn>

			<Separator className="my-12" />

			<FadeIn>
				<p className="leading-8">
					Ou bien, vous pouvez utiliser le{' '}
					<span className="font-bold text-theme">formulaire</span> de contact ci-dessous
					pour me laisser un <span className="font-bold text-theme">message</span>{' '}
					personnalisé.
				</p>
			</FadeIn>
			<FadeIn className="mt-12">
				<ContactForm />
			</FadeIn>
		</FadeInStagger>
	</>
);

export default ContactPage;
