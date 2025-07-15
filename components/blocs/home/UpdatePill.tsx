import { RocketLaunchIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import type React from 'react';
import { memo } from 'react';
import {
	Announcement,
	AnnouncementTag,
	AnnouncementTitle,
} from '@/components/ui/Announcement';
import {
	Glimpse,
	GlimpseContent,
	GlimpseDescription,
	GlimpseImage,
	GlimpseTitle,
	GlimpseTrigger,
} from '@/components/ui/Glimpse';
import { glimpse } from '@/components/ui/Glimpse/server';
import { projectGitHubUrl, wefixAria, wefixUrl } from '@/resources/config';

export const UpdatePill = memo(async (): Promise<React.JSX.Element> => {
	const { image, title, description } = await glimpse(projectGitHubUrl);

	return (
		<Glimpse closeDelay={150} openDelay={600}>
			<GlimpseTrigger asChild>
				<Link
					href={wefixUrl}
					aria-label={wefixAria}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block font-medium text-foreground"
					prefetch={false}
				>
					<Announcement className="mb-6">
						<AnnouncementTag>Mise à jour 2.0</AnnouncementTag>
						<AnnouncementTitle>
							Mon nouveau portfolio !
							<RocketLaunchIcon className="size-4 shrink-0 text-muted-foreground" />
						</AnnouncementTitle>
					</Announcement>
				</Link>
			</GlimpseTrigger>
			<GlimpseContent className="w-80" sideOffset={-2}>
				<GlimpseImage src={image} />
				<GlimpseTitle>{title}</GlimpseTitle>
				<GlimpseDescription>{description}</GlimpseDescription>
			</GlimpseContent>
		</Glimpse>
	);
});
