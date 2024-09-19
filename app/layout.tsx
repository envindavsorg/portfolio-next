import './globals.css';
import { Footer } from '@/components/navigation/Footer';
import { env } from '@/env/client';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import { Inter } from 'next/font/google';
import type React from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	metadataBase: new URL('https://leerob.com'),
	alternates: {
		canonical: '/',
	},
	title: {
		default: env.NEXT_PUBLIC_FULL_NAME,
		template: `%s | ${env.NEXT_PUBLIC_FULL_NAME}`,
	},
	description:
		"Développeur web, passionné par la création d'applications belles et fonctionnelles, et passionné de nouvelles technologies.",
};

interface RootLayoutProps {
	children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => (
	<ViewTransitions>
		<html lang="en" className={`${inter.className} [scrollbar-gutter:stable]`}>
			<body className="tracking-tight antialiased">
				<div className="flex min-h-screen flex-col justify-between bg-background p-8 pt-0 text-switch md:pt-8">
					<main className="mx-auto w-full max-w-[60ch]">{children}</main>
					<Footer />
					<Analytics />
				</div>
			</body>
		</html>
	</ViewTransitions>
);

export default RootLayout;
