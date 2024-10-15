import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Preview,
	Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import type React from 'react';
import config from '../tailwind.config';

interface ContactEmailTemplateProps {
	name: string;
	surname: string;
	mail: string;
	content: string;
}

const ContactEmailTemplate = ({
	name,
	surname,
	mail,
	content,
}: Readonly<ContactEmailTemplateProps>): React.JSX.Element => (
	<Tailwind config={config}>
		<Html>
			<Head />
			<Preview>
				{name} {surname} vous a envoyé un nouveau message :
			</Preview>
			<Body className="bg-black">
				<Container className="mx-auto px-3">
					<Heading className="font-extrabold text-2xl text-white">
						<span className="font-bold text-yellow-300">Driiiing</span>, un
						nouveau message t'attend, depuis ton site !
					</Heading>
					<Text className="mt-20 block text-base text-white">
						<span className="font-bold text-yellow-300">Florin</span>, tu as
						reçu un nouveau message, depuis ton site, de la part de{' '}
						<span className="font-bold">
							{name} {surname}
						</span>{' '}
						qui a pour adresse e-mail{' '}
						<span className="font-extrabold text-yellow-300 underline">
							{mail}
						</span>
						.
					</Text>
					<Text className="mt-10 block text-base text-white">
						Voici le contenu :
					</Text>
					<Text
						className="mt-1 bg-transparent p-4 font-bold text-white text-xl"
						style={{ border: '1px solid #FFFFFF', borderRadius: '10px' }}
					>
						{content}
					</Text>
					<Text className="mt-0.5 block text-gray-700 text-xs">
						Maintenant, tu peux faire ce que tu veux avec ce message ! 🎉
					</Text>

					<Img
						src="https://cuzeac-florin.app/og.png"
						width="36"
						height="36"
						alt="Cuzeac Florin - Mon portfolio personnel"
						style={{ borderRadius: '10px' }}
						className="mt-10 object-cover object-center"
					/>
					<Text className="mt-1 block text-gray-700 text-sm">
						<span className="font-bold text-yellow-300">Cuzeac Florin</span> -
						Mon portfolio personnel -{' '}
						<span className="font-bold text-yellow-300">
							{new Date().getFullYear()}
						</span>
					</Text>
				</Container>
			</Body>
		</Html>
	</Tailwind>
);

export default ContactEmailTemplate;
