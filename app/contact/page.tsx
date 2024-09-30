import ContactForm from '@/components/form/ContactForm';
import { SocialLink } from '@/components/links/SocialLink';
import { Motion } from '@/components/motion/Motion';
import {
	variantsFour,
	variantsOne,
	variantsThree,
	variantsTwo,
} from '@/components/motion/variants';
import { AnimatedNameLink } from '@/components/text/AnimatedName';
import { type ContactMe, contactMe } from '@/content/ContactMe';
import type React from 'react';

export const metadata = {
	title: 'Me contacter',
	alternates: {
		canonical: '/contact',
	},
};

const Contact = (): React.JSX.Element => (
	<>
		<h1 className="fade-in mb-0 pt-16 font-geist-sans font-medium text-lg lg:pt-12">
			Contactez-moi
		</h1>

		<AnimatedNameLink />

		<div className="mt-8 space-y-4 leading-snug">
			<Motion variants={variantsOne} asChild>
				<p className="leading-8">
					N'hésitez pas à <span className="font-bold">me contacter</span> si
					vous avez des <span className="font-bold">questions</span> ou des{' '}
					<span className="font-bold">suggestions</span> concernant mon site,
					mon portfolio, ou mes projets. Je suis disponible pour répondre à
					toutes vos demandes.
				</p>
			</Motion>
		</div>

		<Motion className="mt-12" variants={variantsTwo} asChild>
			<div className="flex gap-6">
				{contactMe.map(({ description, url, icon }: ContactMe, idx: number) => (
					<SocialLink
						key={`${idx}-contact`}
						href={url}
						aria-label={description}
						icon={icon}
						iconProps={{ weight: 'regular' }}
					/>
				))}
			</div>
		</Motion>

		<Motion className="mt-12" variants={variantsThree} asChild>
			<div className="space-y-4 leading-snug">
				<p className="leading-8">
					Ou bien, vous pouvez utiliser le{' '}
					<span className="font-bold">formulaire</span> de contact ci-dessous
					pour me laisser un message personnalisé.
				</p>
			</div>
		</Motion>

		<Motion className="mt-12" variants={variantsFour} asChild>
			<ContactForm />
		</Motion>
	</>
);

export default Contact;
