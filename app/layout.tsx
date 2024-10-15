import './globals.css';
import { Providers } from '@/app/providers';
import { Sparkles } from '@/components/background/Sparkles';
import { Footer } from '@/components/navigation/Footer';
import { NavBar } from '@/components/navigation/NavBar';
import { NavBarProvider } from '@/components/navigation/NavBarProvider';
import { SideNavBar } from '@/components/navigation/SideNavBar';
import { ThemeMeta } from '@/components/theme/ThemeMeta';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Toaster } from '@/components/ui/Sonner';
import { env as client } from '@/env/client';
import { env as server } from '@/env/server';
import { cn } from '@/lib/utils';
import { navigation } from '@/resources/navigation';
import { absoluteUrl, constructMetadata } from '@/site/metadata';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import type { Metadata, Viewport } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import localFont from 'next/font/local';
import Script from 'next/script';
import type React from 'react';
import { Suspense } from 'react';

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

export const metadata: Metadata = constructMetadata({
	title: `${client.NEXT_PUBLIC_NAME} ${client.NEXT_PUBLIC_SURNAME}`,
	description:
		"Développeur web, passionné par la création d'applications belles et fonctionnelles, et de nouvelles technologies.",
	image: absoluteUrl('/api/og'),
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
			className="scrollbar-hide h-full scroll-smooth antialiased [scrollbar-gutter:stable]"
			suppressHydrationWarning
		>
			<body
				className={cn(
					'font-geist-mono tracking-tight antialiased',
					'bg-white dark:bg-black',
					geistSans.variable,
					geistMono.variable,
				)}
			>
				<Providers>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						disableTransitionOnChange
					>
						<ThemeMeta />
						<div className="flex min-h-screen flex-col justify-between p-8 pt-0 text-foreground md:pt-8">
							<SideNavBar />
							<main className="mx-auto w-full max-w-[60ch] pb-5">
								<NavBarProvider>
									<NavBar navigation={navigation} />
								</NavBarProvider>

								{children}
							</main>

							<Suspense>
								<Footer />
							</Suspense>

							<Sparkles density={50} />
						</div>

						<Toaster position="bottom-right" />
					</ThemeProvider>

					{process.env.NODE_ENV === 'production' && (
						<>
							<Analytics mode={'production'} debug={true} />
							<SpeedInsights debug={false} />

							{process.env.NODE_ENV === 'production' && (
								<Script
									defer
									src={server.UMAMI_SCRIPT}
									data-website-id={server.UMAMI_WEBSITE_ID}
								/>
							)}
						</>
					)}
				</Providers>
			</body>
		</html>
	</ViewTransitions>
);

export default RootLayout;
