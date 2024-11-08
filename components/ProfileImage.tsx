import avatar from '@/images/avatar.webp';
import Image from 'next/image';
import type React from 'react';

const Florin = (): React.JSX.Element => (
	<Image
		src={avatar}
		quality={95}
		width={64}
		height={64}
		priority={true}
		className="rounded-full"
		alt="Une photo de moi"
	/>
);

export const ProfileImage = (): React.JSX.Element => (
	<div className="rounded-full bg-theme p-px shadow-lg ring-[2.5px] ring-orange-300/30 dark:ring-yellow-300/30">
		<div className="flex size-9 items-center justify-center rounded-full p-[0.5px]">
			<Florin />
		</div>
	</div>
);

export const ProfileImageLarge = (): React.JSX.Element => (
	<div className="rounded-full bg-theme p-px shadow-lg ring-[5px] ring-orange-300/30 dark:ring-yellow-300/30">
		<div className="flex size-14 items-center justify-center rounded-full p-0.5">
			<Florin />
		</div>
	</div>
);
