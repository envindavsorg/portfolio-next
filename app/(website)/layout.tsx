import { Sparkles } from '@/components/background/Sparkles';
import { Footer } from '@/components/navigation/Footer';
import { NavBar } from '@/components/navigation/NavBar';
import { NavBarProvider } from '@/components/navigation/NavBarProvider';
import { SideNavBar } from '@/components/navigation/SideNavBar';
import type React from 'react';
import { Suspense } from 'react';

interface RootLayoutProps {
	children: React.ReactNode;
}

const WebsiteLayout = async ({ children }: Readonly<RootLayoutProps>) => (
	<div className="flex min-h-screen flex-col justify-between p-8 text-foreground pt-8">
		<SideNavBar />
		<main className="mx-auto w-full max-w-[60ch] pb-5">
			<NavBarProvider>
				<NavBar />
			</NavBarProvider>

			{children}
		</main>

		<Suspense>
			<Footer />
		</Suspense>

		<Sparkles density={50} />
	</div>
);

export default WebsiteLayout;
