import { auth } from '@/app/auth';
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
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/Table';
import {
	Activity,
	ArrowUpRight,
	CreditCard,
	CurrencyEur,
	Users,
} from '@phosphor-icons/react/dist/ssr';
import type { Session } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import type React from 'react';

const DashboardPage = async (): Promise<React.JSX.Element> => {
	const session: Session | null = await auth();
	if (!session || !session.user) {
		redirect('/login');
	}

	return (
		<>
			<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
				<Card x-chunk="dashboard-01-chunk-0">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Total Revenue</CardTitle>
						<CurrencyEur className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">$45,231.89</div>
						<p className="text-muted-foreground text-xs">
							+20.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card x-chunk="dashboard-01-chunk-1">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Subscriptions</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">+2350</div>
						<p className="text-muted-foreground text-xs">
							+180.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card x-chunk="dashboard-01-chunk-2">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Sales</CardTitle>
						<CreditCard className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">+12,234</div>
						<p className="text-muted-foreground text-xs">
							+19% from last month
						</p>
					</CardContent>
				</Card>
				<Card x-chunk="dashboard-01-chunk-3">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="font-medium text-sm">Active Now</CardTitle>
						<Activity className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="font-bold text-2xl">+573</div>
						<p className="text-muted-foreground text-xs">
							+201 since last hour
						</p>
					</CardContent>
				</Card>
			</div>
			<div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
				<Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
					<CardHeader className="flex flex-row items-center">
						<div className="grid gap-2">
							<CardTitle>Transactions</CardTitle>
							<CardDescription>
								Recent transactions from your store.
							</CardDescription>
						</div>
						<Button asChild size="sm" className="ml-auto gap-1">
							<Link href="#">
								View All
								<ArrowUpRight className="h-4 w-4" />
							</Link>
						</Button>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Customer</TableHead>
									<TableHead className="hidden xl:table-column">Type</TableHead>
									<TableHead className="hidden xl:table-column">
										Status
									</TableHead>
									<TableHead className="hidden xl:table-column">Date</TableHead>
									<TableHead className="text-right">Amount</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell>
										<div className="font-medium">Liam Johnson</div>
										<div className="hidden text-muted-foreground text-sm md:inline">
											liam@example.com
										</div>
									</TableCell>
									<TableCell className="hidden xl:table-column">Sale</TableCell>
									<TableCell className="hidden xl:table-column">
										<Badge className="text-xs">Approved</Badge>
									</TableCell>
									<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
										2023-06-23
									</TableCell>
									<TableCell className="text-right">$250.00</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<div className="font-medium">Olivia Smith</div>
										<div className="hidden text-muted-foreground text-sm md:inline">
											olivia@example.com
										</div>
									</TableCell>
									<TableCell className="hidden xl:table-column">
										Refund
									</TableCell>
									<TableCell className="hidden xl:table-column">
										<Badge className="text-xs">Declined</Badge>
									</TableCell>
									<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
										2023-06-24
									</TableCell>
									<TableCell className="text-right">$150.00</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<div className="font-medium">Noah Williams</div>
										<div className="hidden text-muted-foreground text-sm md:inline">
											noah@example.com
										</div>
									</TableCell>
									<TableCell className="hidden xl:table-column">
										Subscription
									</TableCell>
									<TableCell className="hidden xl:table-column">
										<Badge className="text-xs">Approved</Badge>
									</TableCell>
									<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
										2023-06-25
									</TableCell>
									<TableCell className="text-right">$350.00</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<div className="font-medium">Emma Brown</div>
										<div className="hidden text-muted-foreground text-sm md:inline">
											emma@example.com
										</div>
									</TableCell>
									<TableCell className="hidden xl:table-column">Sale</TableCell>
									<TableCell className="hidden xl:table-column">
										<Badge className="text-xs">Approved</Badge>
									</TableCell>
									<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
										2023-06-26
									</TableCell>
									<TableCell className="text-right">$450.00</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<div className="font-medium">Liam Johnson</div>
										<div className="hidden text-muted-foreground text-sm md:inline">
											liam@example.com
										</div>
									</TableCell>
									<TableCell className="hidden xl:table-column">Sale</TableCell>
									<TableCell className="hidden xl:table-column">
										<Badge className="text-xs">Approved</Badge>
									</TableCell>
									<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
										2023-06-27
									</TableCell>
									<TableCell className="text-right">$550.00</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CardContent>
				</Card>
				<Card x-chunk="dashboard-01-chunk-5">
					<CardHeader>
						<CardTitle>Recent Sales</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-8">
						<div className="flex items-center gap-4">
							<Avatar className="hidden h-9 w-9 sm:flex">
								<AvatarImage src="/avatars/01.png" alt="Avatar" />
								<AvatarFallback>OM</AvatarFallback>
							</Avatar>
							<div className="grid gap-1">
								<p className="font-medium text-sm leading-none">
									Olivia Martin
								</p>
								<p className="text-muted-foreground text-sm">
									olivia.martin@email.com
								</p>
							</div>
							<div className="ml-auto font-medium">+$1,999.00</div>
						</div>
						<div className="flex items-center gap-4">
							<Avatar className="hidden h-9 w-9 sm:flex">
								<AvatarImage src="/avatars/02.png" alt="Avatar" />
								<AvatarFallback>JL</AvatarFallback>
							</Avatar>
							<div className="grid gap-1">
								<p className="font-medium text-sm leading-none">Jackson Lee</p>
								<p className="text-muted-foreground text-sm">
									jackson.lee@email.com
								</p>
							</div>
							<div className="ml-auto font-medium">+$39.00</div>
						</div>
						<div className="flex items-center gap-4">
							<Avatar className="hidden h-9 w-9 sm:flex">
								<AvatarImage src="/avatars/03.png" alt="Avatar" />
								<AvatarFallback>IN</AvatarFallback>
							</Avatar>
							<div className="grid gap-1">
								<p className="font-medium text-sm leading-none">
									Isabella Nguyen
								</p>
								<p className="text-muted-foreground text-sm">
									isabella.nguyen@email.com
								</p>
							</div>
							<div className="ml-auto font-medium">+$299.00</div>
						</div>
						<div className="flex items-center gap-4">
							<Avatar className="hidden h-9 w-9 sm:flex">
								<AvatarImage src="/avatars/04.png" alt="Avatar" />
								<AvatarFallback>WK</AvatarFallback>
							</Avatar>
							<div className="grid gap-1">
								<p className="font-medium text-sm leading-none">William Kim</p>
								<p className="text-muted-foreground text-sm">will@email.com</p>
							</div>
							<div className="ml-auto font-medium">+$99.00</div>
						</div>
						<div className="flex items-center gap-4">
							<Avatar className="hidden h-9 w-9 sm:flex">
								<AvatarImage src="/avatars/05.png" alt="Avatar" />
								<AvatarFallback>SD</AvatarFallback>
							</Avatar>
							<div className="grid gap-1">
								<p className="font-medium text-sm leading-none">Sofia Davis</p>
								<p className="text-muted-foreground text-sm">
									sofia.davis@email.com
								</p>
							</div>
							<div className="ml-auto font-medium">+$39.00</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
};

export default DashboardPage;
