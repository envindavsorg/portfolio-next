import { Sparkles } from '@/components/background/Sparkles';
import { CommandProvider } from '@/components/command/CommandContext';
import { CommandMenu } from '@/components/command/CommandMenu';
import { Footer } from '@/components/navigation/Footer';
import { NavBar } from '@/components/navigation/NavBar';
import type React from 'react';

interface RootLayoutProps {
	children: React.ReactNode;
}

const WebsiteLayout = ({ children }: Readonly<RootLayoutProps>) => (
	<div className="flex min-h-screen flex-col justify-between p-6 text-foreground sm:p-8">
		<NavBar />
		<main className="mx-auto w-full max-w-[60ch]">{children}</main>
		<Footer />

		<CommandProvider>
			<CommandMenu />
		</CommandProvider>
		<Sparkles density={50} />
	</div>
);

export default WebsiteLayout;
