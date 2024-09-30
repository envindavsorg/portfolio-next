import { Link } from 'next-view-transitions';
import type React from 'react';

interface SocialLinkProps {
	icon: React.ComponentType<{ className?: string }>;
	iconProps?: Record<string, any>;
}

export const SocialLink = ({
	icon: Icon,
	iconProps = {},
	...props
}: React.ComponentPropsWithoutRef<typeof Link> &
	SocialLinkProps): React.JSX.Element => (
	<Link className="group -m-1 p-1" {...props}>
		<Icon
			className="size-8 fill-foreground transition duration-200 group-hover:scale-110 group-hover:fill-theme"
			{...iconProps}
		/>
	</Link>
);
