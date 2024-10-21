import { FadeInStagger } from '@/components/animations/FadeIn';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { SheetContent, SheetMain, SheetTrigger } from '@/components/ui/Sheet';
import { env } from '@/env/client';
import { auth, signOut } from '@/lib/auth';
import { List, Package } from '@phosphor-icons/react/dist/ssr';
import type { Session } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import type React from 'react';

const DashboardLayout = async ({
	children,
}: { children: React.ReactNode }): Promise<React.JSX.Element> => {
	const session: Session | null = await auth();
	if (!session || !session.user) {
		redirect('/login');
	}

	return (
		<FadeInStagger faster>
			<div className="flex min-h-screen w-full flex-col">
				<header className="sticky top-0 flex h-16 items-center gap-4 border-neutral-200 border-b bg-background px-4 md:px-6 dark:border-neutral-700">
					<nav className="hidden flex-col gap-6 font-medium text-lg md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
						<div className="flex items-center">
							<Avatar className="flex size-9">
								<AvatarImage
									src="/og-author.png"
									alt={env.NEXT_PUBLIC_FULLNAME}
								/>
								<AvatarFallback>
									{`${env.NEXT_PUBLIC_NAME?.[0] || ''}${env.NEXT_PUBLIC_SURNAME?.[0] || ''}`}
								</AvatarFallback>
							</Avatar>
						</div>
						<Link
							href="#"
							className="text-foreground transition-colors hover:text-foreground"
						>
							Dashboard
						</Link>
						<Link
							href="#"
							className="text-muted-foreground transition-colors hover:text-foreground"
						>
							Orders
						</Link>
						<Link
							href="#"
							className="text-muted-foreground transition-colors hover:text-foreground"
						>
							Products
						</Link>
						<Link
							href="#"
							className="text-muted-foreground transition-colors hover:text-foreground"
						>
							Customers
						</Link>
						<Link
							href="#"
							className="text-muted-foreground transition-colors hover:text-foreground"
						>
							Analytics
						</Link>
					</nav>
					<SheetMain>
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="shrink-0 md:hidden"
							>
								<List className="h-5 w-5" />
								<span className="sr-only">Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left">
							<nav className="grid gap-6 font-medium text-lg">
								<Link
									href="#"
									className="flex items-center gap-2 font-semibold text-lg"
								>
									<Package className="h-6 w-6" />
									<span className="sr-only">Acme Inc</span>
								</Link>
								<Link href="#" className="hover:text-foreground">
									Dashboard
								</Link>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Orders
								</Link>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Products
								</Link>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Customers
								</Link>
								<Link
									href="#"
									className="text-muted-foreground hover:text-foreground"
								>
									Analytics
								</Link>
							</nav>
						</SheetContent>
					</SheetMain>

					<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
						<div className="ml-auto flex-1 sm:flex-initial">
							<div className="ms-auto flex w-fit flex-col items-end justify-end">
								<h3 className="font-bold font-geist-sans text-sm">
									{session.user.name}
								</h3>
								<p className="text-muted-foreground text-xs">
									{session.user.email}
								</p>
							</div>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger className="cursor-pointer" asChild>
								<Avatar className="flex size-9">
									<AvatarImage
										src={session.user.image || '/og.png'}
										alt={
											session.user.name ||
											`${env.NEXT_PUBLIC_NAME}${env.NEXT_PUBLIC_SURNAME}`
										}
									/>
									<AvatarFallback>
										{`${env.NEXT_PUBLIC_NAME?.[0] || ''}${env.NEXT_PUBLIC_SURNAME?.[0] || ''}`}
									</AvatarFallback>
									<span className="sr-only">Cliquer pour ouvrir le menu</span>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="mt-2 flex w-44 flex-col gap-y-6 rounded-md bg-background p-3"
								align="end"
							>
								<div className="divide-y divide-border">
									<DropdownMenuItem
										asChild
										className="focus:!bg-transparent space-y-3 px-0 py-3"
									>
										<Link
											href="/"
											aria-label="Retourner à la page d'accueil"
											className="flex w-full items-center justify-between font-medium text-base text-foreground no-underline"
										>
											<p>accueil</p>
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem
										asChild
										className="focus:!bg-transparent space-y-3 px-0 py-3"
									>
										<Link
											href="/"
											aria-label="Retourner à la page d'accueil"
											className="flex w-full items-center justify-between font-medium text-base text-foreground no-underline"
										>
											<p>accueil</p>
										</Link>
									</DropdownMenuItem>
								</div>

								<form
									action={async () => {
										'use server';
										await signOut();
									}}
								>
									<Button
										className="w-full"
										size="default"
										variant="destructive"
									>
										<p className="font-bold">Déconnexion</p>
									</Button>
								</form>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>
				<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
					{children}
				</main>
			</div>
		</FadeInStagger>
	);
};

export default DashboardLayout;
