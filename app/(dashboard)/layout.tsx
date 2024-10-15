import { auth } from '@/app/auth';
import { FadeInStagger } from '@/components/animations/FadeIn';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/Card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { SheetContent, SheetMain, SheetTrigger } from '@/components/ui/Sheet';
import { env } from '@/env/client';
import {
	Bell,
	ChartPie,
	House,
	List,
	Package,
	ShoppingCart,
	UserCircle,
	Users,
} from '@phosphor-icons/react/dist/ssr';
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
			<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
				<div className="hidden border-neutral-200 border-r bg-muted/40 md:block dark:border-neutral-700">
					<div className="flex h-full max-h-screen flex-col gap-2">
						<div className="flex h-14 items-center justify-center border-neutral-200 border-b px-4 lg:h-[60px] lg:px-6 dark:border-neutral-700">
							<Link
								href="/dashboard"
								aria-label="Beinvenue sur l'espace d'administration"
								className="font-bold text-xl no-underline"
							>
								Mon portfolio
							</Link>
						</div>
						<div className="flex-1">
							<nav className="grid items-start px-2 font-medium text-sm lg:px-4">
								<Link
									href="#"
									className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
								>
									<House className="h-4 w-4" />
									Dashboard
								</Link>
								<Link
									href="#"
									className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
								>
									<House className="h-4 w-4" />
									Orders
									<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
										6
									</Badge>
								</Link>
								<Link
									href="#"
									className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
								>
									<Package className="h-4 w-4" />
									Products{' '}
								</Link>
								<Link
									href="#"
									className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
								>
									<Users className="h-4 w-4" />
									Customers
								</Link>
								<Link
									href="#"
									className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
								>
									<ChartPie className="h-4 w-4" />
									Analytics
								</Link>
							</nav>
						</div>
						<div className="mt-auto p-4">
							<Card x-chunk="dashboard-02-chunk-0">
								<CardHeader className="p-2 pt-0 md:p-4">
									<CardTitle>Upgrade to Pro</CardTitle>
									<CardDescription>
										Unlock all features and get unlimited access to our support
										team.
									</CardDescription>
								</CardHeader>
								<CardContent className="p-2 pt-0 md:p-4 md:pt-0">
									<Button size="sm" className="w-full">
										Upgrade
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>

				<div className="flex flex-col">
					<header className="flex h-14 items-center gap-4 border-neutral-200 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 dark:border-neutral-700">
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
							<SheetContent side="left" className="flex flex-col">
								<nav className="grid gap-2 font-medium text-lg">
									<Link
										href="#"
										className="flex items-center gap-2 font-semibold text-lg"
									>
										<Package className="h-6 w-6" />
										<span className="sr-only">Acme Inc</span>
									</Link>
									<Link
										href="#"
										className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
									>
										<House className="h-5 w-5" />
										Dashboard
									</Link>
									<Link
										href="#"
										className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
									>
										<ShoppingCart className="h-5 w-5" />
										Orders
										<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
											6
										</Badge>
									</Link>
									<Link
										href="#"
										className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
									>
										<Package className="h-5 w-5" />
										Products
									</Link>
									<Link
										href="#"
										className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
									>
										<Users className="h-5 w-5" />
										Customers
									</Link>
									<Link
										href="#"
										className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
									>
										<ChartPie className="h-5 w-5" />
										Analytics
									</Link>
								</nav>
								<div className="mt-auto">
									<Card>
										<CardHeader>
											<CardTitle>Upgrade to Pro</CardTitle>
											<CardDescription>
												Unlock all features and get unlimited access to our
												support team.
											</CardDescription>
										</CardHeader>
										<CardContent>
											<Button size="sm" className="w-full">
												Upgrade
											</Button>
										</CardContent>
									</Card>
								</div>
							</SheetContent>
						</SheetMain>
						<div className="w-full flex-1">
							<Button variant="outline" size="icon" className="ml-auto h-8 w-8">
								<Bell className="h-4 w-4" />
								<span className="sr-only">Toggle notifications</span>
							</Button>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="secondary"
									size="icon"
									className="rounded-full"
								>
									<UserCircle className="h-5 w-5" />
									<span className="sr-only">Toggle user menu</span>

									<Avatar className="size-8">
										<AvatarImage
											src={session.user.image || '/og.png'}
											alt={`${env.NEXT_PUBLIC_NAME} ${env.NEXT_PUBLIC_SURNAME}`}
										/>
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuItem>Support</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Logout</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</header>

					<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
						{children}
					</main>
				</div>
			</div>
		</FadeInStagger>
	);
};

export default DashboardLayout;
