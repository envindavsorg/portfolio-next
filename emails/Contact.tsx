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
import type React from 'react';

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
}: Readonly<ContactEmailTemplateProps>) => (
	<Html>
		<Head />
		<Preview>
			{name} {surname} vous a envoyé un nouveau message :
		</Preview>
		<Body
			style={{
				backgroundColor: '#FFFFFF',
			}}
		>
			<Container
				style={{
					paddingLeft: '12px',
					paddingRight: '12px',
					margin: '0 auto',
				}}
			>
				<Heading
					style={{
						color: '#333333',
						fontSize: '24px',
						fontWeight: 'bold',
						margin: '40px 0',
						padding: '0',
					}}
				>
					Driiiing, un nouveau message t'attend, depuis ton site ! 📩
				</Heading>
				<Text
					style={{
						fontSize: '14px',
						margin: '24px 0',
						display: 'block',
						marginBottom: '4px',
					}}
				>
					Florin, tu as reçu un nouveau message, depuis ton site, de la part de{' '}
					<span
						style={{
							fontWeight: 'bold',
						}}
					>
						{name} {surname}
					</span>{' '}
					qui a pour adresse e-mail{' '}
					<span
						style={{
							fontWeight: 'bold',
							textDecoration: 'underline',
						}}
					>
						{mail}
					</span>
					. Voici le contenu :
				</Text>
				<Text
					style={{
						display: 'inline-block',
						padding: '16px 4.5%',
						width: '90.5%',
						backgroundColor: 'transparent',
						borderRadius: '5px',
						border: '1px solid #FFFFFF',
						color: '#FFFFFF',
						fontWeight: 600,
						fontSize: '18px',
					}}
				>
					{content}
				</Text>
				<Text
					style={{
						fontSize: '14px',
						margin: '24px 0',
						color: '#ABABAB',
						marginTop: '4px',
						marginBottom: '12px',
					}}
				>
					Maintenant, tu peux faire ce que tu veux avec ce message ! 🎉
				</Text>
				<Img
					src="https://cuzeac-florin.app/og.png"
					width="36"
					height="36"
					alt="Cuzeac Florin - Mon portfolio personnel"
					style={{ borderRadius: '10px', marginTop: '18px' }}
				/>
				<Text
					style={{
						color: '#898989',
						fontSize: '12px',
						lineHeight: '22px',
						marginTop: '12px',
						marginBottom: '24px',
					}}
				>
					Cuzeac Florin - Mon portfolio personnel - {new Date().getFullYear()}
				</Text>
			</Container>
		</Body>
	</Html>
);

export default ContactEmailTemplate;
