import { signIn } from '@/app/auth';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/Button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/Card';
import { GithubLogo, SignIn } from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';
import type React from 'react';

export const metadata: Metadata = {
	title: 'Se connecter | Administration',
	description: "Se connecter à l'espace d'administration",
};

const LoginPage = (): React.JSX.Element => {
	const signInWithGitHub = async () => {
		'use server';
		await signIn('github', { redirectTo: '/dashboard' });
	};

	return (
		<>
			<Card className="w-full max-w-sm">
				<CardHeader>
					<FadeIn>
						<SignIn className="mb-3 size-6 shrink-0 sm:size-8" weight="bold" />
					</FadeIn>
					<FadeIn>
						<CardTitle className="font-bold font-geist-sans text-2xl md:text-3xl">
							Se connecter
						</CardTitle>
					</FadeIn>
					<FadeIn>
						<CardDescription>
							Clique sur le <span className="font-bold text-theme">bouton</span>{' '}
							ci-dessous pour accéder à l'
							<span className="font-bold text-theme">
								espace d'administration
							</span>
							.
						</CardDescription>
					</FadeIn>
				</CardHeader>
				<CardContent className="text-sm">
					<FadeIn>
						Une fois <span className="font-bold">connecté</span>, tu pourras
						accéder à toutes les{' '}
						<span className="font-bold">fonctionnalités</span> de l'application.
					</FadeIn>
				</CardContent>
				<CardFooter>
					<form className="flex w-full flex-col" action={signInWithGitHub}>
						<FadeIn>
							<Button className="flex w-full items-center gap-x-2">
								<GithubLogo className="size-4 shrink-0" weight="bold" />
								Connexion avec <span className="font-bold">GitHub</span>
							</Button>
						</FadeIn>
					</form>
				</CardFooter>
			</Card>
		</>
	);
};

export default LoginPage;
