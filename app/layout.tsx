import './globals.css';
import { Sparkles } from '@/components/background/Sparkles';
import { Footer } from '@/components/navigation/Footer';
import { NavBar } from '@/components/navigation/NavBar';
import { navItems } from '@/components/navigation/NavItems';
import { SideStaggerNavigation } from '@/components/navigation/SideStaggerNav';
import { NavBarProvider } from '@/components/navigation/modules/NavBarProvider';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Toaster } from '@/components/ui/Sonner';
import { env as client } from '@/env/client';
import { env as server } from '@/env/server';
import { cn } from '@/lib/utils';
import { absoluteUrl, constructMetadata } from '@/site/metadata';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import type { Metadata, Viewport } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import localFont from 'next/font/local';
import Script from 'next/script';
import type React from 'react';
import { ProgressBar, ProgressBarProvider } from 'react-transition-progress';

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

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => (
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
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					disableTransitionOnChange
				>
					<ProgressBarProvider>
						<ProgressBar className="fixed top-0 h-1 bg-theme" />
						<div className="flex min-h-screen flex-col justify-between p-8 pt-0 text-foreground md:pt-8">
							<SideStaggerNavigation />
							<main className="mx-auto w-full max-w-[60ch] pb-5">
								<NavBarProvider>
									<NavBar navItems={navItems} />
								</NavBarProvider>

								{children}
							</main>
							<Footer />

							<Sparkles density={50} />
							<Toaster position="bottom-right" />
						</div>
					</ProgressBarProvider>
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
			</body>
		</html>
	</ViewTransitions>
);

export default RootLayout;
