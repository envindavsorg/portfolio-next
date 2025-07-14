import './globals.css';

import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { Metadata, Viewport } from 'next';
import { ViewTransitions } from 'next-view-transitions';
import type React from 'react';
import { lazy, Suspense } from 'react';
import { BackToTop } from '@/components/BackToTop';
import { OnekoCat } from '@/components/blocs/OnekoCat';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { ResourceHintsProvider } from '@/components/providers/ResourceHintsProvider';
import { ServiceWorkerProvider } from '@/components/providers/ServiceWorkerProvider';
import { ThemeMeta } from '@/components/theme/ThemeMeta';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { constructMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';
import { name } from '@/resources/config';

const Analytics = lazy(() =>
	import('@vercel/analytics/react').then((m) => ({ default: m.Analytics })),
);
const SpeedInsights = lazy(() =>
	import('@vercel/speed-insights/react').then((m) => ({ default: m.SpeedInsights })),
);
const Sparkles = lazy(() =>
	import('@/components/blocs/Sparkles').then((m) => ({ default: m.Sparkles })),
);
const Toaster = lazy(() =>
	import('@/components/ui/Sonner').then((m) => ({ default: m.Toaster })),
);
const OfflineIndicator = lazy(() =>
	import('@/components/ui/OfflineIndicator').then((m) => ({
		default: m.OfflineIndicator,
	})),
);

export const metadata: Metadata = constructMetadata();

export const viewport: Viewport = {
	viewportFit: 'cover',
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'hsl(0, 0%, 98%)' },
		{ media: '(prefers-color-scheme: dark)', color: 'hsl(0, 0%, 0%)' },
	],
	colorScheme: 'dark light',
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
};

interface RootLayoutProps {
	children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => (
	<ViewTransitions>
		<html
			lang="fr"
			dir="ltr"
			className={cn(
				'scrollbar-hide h-full antialiased',
				GeistSans.variable,
				GeistMono.variable,
			)}
			suppressHydrationWarning
		>
			<head>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="apple-mobile-web-app-title" content="Portfolio" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<title>{name}</title>
			</head>
			<body className="select-none bg-background font-geist-mono tracking-tight antialiased">
				<ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
					<LenisProvider>
						<ThemeMeta />
						<ResourceHintsProvider />
						<ServiceWorkerProvider />

						<div className="container flex min-h-screen max-w-2xl flex-col">
							<main
								id="main-content"
								className="flex flex-1 flex-col pt-30 pb-20 md:pt-38"
							>
								{children}
								<OnekoCat />
							</main>
						</div>

						<Suspense fallback={null}>
							<Toaster position="bottom-right" richColors closeButton />
							<Sparkles density={10} />
							<OfflineIndicator />
						</Suspense>

						{process.env.NODE_ENV === 'production' && (
							<Suspense fallback={null}>
								<Analytics mode={'production'} debug={false} />
								<SpeedInsights debug={false} />
							</Suspense>
						)}

						<div className="relative z-[100]">
							<BackToTop />
						</div>
					</LenisProvider>
				</ThemeProvider>
			</body>
		</html>
	</ViewTransitions>
);

export default RootLayout;
