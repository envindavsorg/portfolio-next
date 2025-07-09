import { type NextRequest, NextResponse } from 'next/server';
import { type CreateEmailResponse, Resend } from 'resend';
import ContactEmailTemplate from '@/emails/Contact';

const resend: Resend = new Resend(process.env.RESEND_API_KEY);

type Props =
	| NextResponse<CreateEmailResponse>
	| NextResponse<{
			error: any;
	  }>;

export const POST = async (req: NextRequest): Promise<Props> => {
	const json: Promise<any> = req.json();
	const { name, surname, mail, content } = await json;

	try {
		const data: CreateEmailResponse = await resend.emails.send({
			from: 'Mon portfolio <onboarding@resend.dev>',
			to: ['cuzeacflo@gmail.com'],
			subject: 'Contact -> Mon portfolio personnel',
			text: `Bonjour, ${name} ${surname} vous a envoyé un message via le formulaire de contact de votre portfolio personnel. Voici son message : ${content}`,
			react: ContactEmailTemplate({ name, surname, mail, content }),
		});

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({
			error,
		});
	}
};
