import { Sparkles } from '@/components/background/Sparkles';
import { Footer } from '@/components/navigation/Footer';
import { NavBar } from '@/components/navigation/NavBar';
import { NavBarProvider } from '@/components/navigation/NavBarProvider';
import { SideNavBar } from '@/components/navigation/SideNavBar';
import { navigation } from '@/resources/navigation';
import type React from 'react';
import { Suspense } from 'react';

interface RootLayoutProps {
	children: React.ReactNode;
}

const WebsiteLayout = async ({ children }: Readonly<RootLayoutProps>) => (
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
);

export default WebsiteLayout;
