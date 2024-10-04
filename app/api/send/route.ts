import ContactEmailTemplate from '@/emails/Contact';
import { env } from '@/env/server';
import { type NextRequest, NextResponse } from 'next/server';
import { type CreateEmailResponse, Resend } from 'resend';

const resend: Resend = new Resend(env.RESEND_API_KEY);

export const POST = async (
	req: NextRequest,
): Promise<
	| NextResponse<CreateEmailResponse>
	| NextResponse<{
			error: any;
	  }>
> => {
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
