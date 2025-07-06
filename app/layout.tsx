import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { ViewTransitions } from 'next-view-transitions';
import type React from 'react';
import { Sparkles } from '@/components/background/Sparkles';
import { ThemeMeta } from '@/components/theme/ThemeMeta';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Toaster } from '@/components/ui/Sonner';
import { cn } from '@/lib/utils';
import { name } from '@/resources/config';
import { absoluteUrl, constructMetadata } from '@/site/metadata';

const geistSans = localFont({
	src: '../fonts/GeistSansVF.woff2',
	variable: '--font-geist-sans',
	weight: '100 900',
});

const geistMono = localFont({
	src: '../fonts/GeistMonoVF.woff2',
	variable: '--font-geist-mono',
	weight: '100 900',
});

const hubot = localFont({
	src: '../fonts/HubotSans.woff2',
	variable: '--font-hubot',
	weight: '400 900',
});

export const metadata: Metadata = constructMetadata({
	title: name,
	description:
		"Développeur web, passionné par la création d'applications belles et fonctionnelles, et de nouvelles technologies.",
	image: absoluteUrl(`/api/og?heading=${name}&type=image&mode=dark`),
});

export const viewport: Viewport = {
	viewportFit: 'cover',
};

interface RootLayoutProps {
	children: React.ReactNode;
}

const RootLayout = async ({ children }: Readonly<RootLayoutProps>) => (
	<ViewTransitions>
		<html
			lang="fr"
			dir="ltr"
			className="scrollbar-hide h-full scroll-smooth antialiased"
			suppressHydrationWarning
		>
			<body
				className={cn(
					'font-geist-mono tracking-tight antialiased',
					'select-none bg-white dark:bg-black',
					geistSans.variable,
					geistMono.variable,
					hubot.variable,
				)}
			>
				<ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
					<ThemeMeta />

					<div className="container flex min-h-screen max-w-2xl flex-col">
						<main className="flex flex-1 flex-col pt-30 pb-20 md:pt-38">{children}</main>
					</div>

					<Toaster position="bottom-right" />
					<Sparkles density={50} />
				</ThemeProvider>

				{process.env.NODE_ENV === 'production' && (
					<>
						<Analytics mode={'production'} debug={true} />
						<SpeedInsights debug={false} />

						{process.env.NODE_ENV === 'production' && (
							<Script
								defer
								src={process.env.UMAMI_SCRIPT}
								data-website-id={process.env.UMAMI_WEBSITE_ID}
							/>
						)}
					</>
				)}
			</body>
		</html>
	</ViewTransitions>
);

export default RootLayout;
