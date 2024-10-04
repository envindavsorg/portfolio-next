'use client';

import { Button } from '@/components/ui/Button';
import { ArrowLeft } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import type React from 'react';

const NotFound = (): React.JSX.Element => {
	const router = useRouter();

	return (
		<div className="flex w-full flex-col items-center justify-center gap-y-3 overflow-hidden">
			<h1 className="flex font-extrabold font-geist-sans text-7xl text-theme sm:text-9xl">
				404
			</h1>
			<p>Oups, page introuvable.</p>
			<Button
				className="mt-6 flex w-max items-center gap-x-2"
				size="lg"
				variant="outline"
				onClick={() => router.back()}
			>
				<ArrowLeft className="size-4 shrink-0" />
				Revenir en arrière
			</Button>
		</div>
	);
};

export default NotFound;
