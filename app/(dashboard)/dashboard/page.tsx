import { auth, signOut } from '@/app/auth';
import { Button } from '@/components/ui/Button';
import type { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import type React from 'react';

const DashboardPage = async (): Promise<React.JSX.Element> => {
	const session: Session | null = await auth();
	if (!session || !session.user) {
		redirect('/login');
	}

	return (
		<>
			<div className="flex items-center">
				<h1 className="font-semibold text-lg md:text-2xl">Inventory</h1>
			</div>
			<div
				className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
				x-chunk="dashboard-02-chunk-1"
			>
				<div className="flex flex-col items-center gap-1 text-center">
					<h3 className="font-bold text-2xl tracking-tight">
						You have no products
					</h3>
					<p className="text-muted-foreground text-sm">
						You can start selling as soon as you add a product.
					</p>
					<Button className="mt-4">Add Product</Button>
				</div>
			</div>

			<form
				action={async () => {
					'use server';
					await signOut();
				}}
			>
				<button type="submit">Sign Out</button>
			</form>
		</>
	);
};

export default DashboardPage;
