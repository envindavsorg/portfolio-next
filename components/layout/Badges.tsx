import { CSSIcon } from '@/components/icons/CSS';
import { HTML5Icon } from '@/components/icons/HTML';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { Badge } from '@/components/ui/Badge';
import type React from 'react';

type BadgeWithIconProps = {
	icon: React.ReactNode;
	label: string;
};

const BadgeWithIcon = ({
	icon,
	label,
}: BadgeWithIconProps): React.JSX.Element => (
	<Badge>
		{icon}
		&nbsp;{label}
	</Badge>
);

export const HTMLBadge = (): React.JSX.Element => (
	<BadgeWithIcon icon={<HTML5Icon />} label="HTML" />
);

export const CSSBadge = (): React.JSX.Element => (
	<BadgeWithIcon icon={<CSSIcon />} label="CSS" />
);

export const JavaScriptBadge = (): React.JSX.Element => (
	<BadgeWithIcon icon={<JavaScriptIcon />} label="JavaScript" />
);
