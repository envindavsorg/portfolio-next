import Image from 'next/image';
import type React from 'react';
import avatar from '@/images/avatar.webp';
import { cn } from '@/lib/utils';

interface ProfileImageProps {
	className?: string;
}

const Florin = ({ className }: ProfileImageProps): React.JSX.Element => (
	<Image
		src={avatar}
		quality={95}
		priority={true}
		className={cn('rounded-full', className)}
		alt="Une photo de moi"
	/>
);

export const ProfileImage = ({ className }: ProfileImageProps): React.JSX.Element => (
	<div className="rounded-full ring-4 ring-orange-300/30 dark:ring-yellow-300/30">
		<div className={cn('flex items-center justify-center rounded-full', className)}>
			<Florin className={className} />
		</div>
	</div>
);
