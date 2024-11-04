import { CSSIcon } from '@/components/icons/CSS';
import { HTML5Icon } from '@/components/icons/HTML';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { ReactIcon } from '@/components/icons/React';
import { TailwindIcon } from '@/components/icons/Tailwind';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import { VueIcon } from '@/components/icons/Vue';
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

export const ReactBadge = (): React.JSX.Element => (
	<BadgeWithIcon icon={<ReactIcon />} label="React" />
);

export const VueBadge = (): React.JSX.Element => (
	<BadgeWithIcon icon={<VueIcon />} label="Vue" />
);

export const TypeScriptBadge = (): React.JSX.Element => (
	<BadgeWithIcon icon={<TypeScriptIcon />} label="TypeScript" />
);

export const TailwindBadge = (): React.JSX.Element => (
	<BadgeWithIcon icon={<TailwindIcon />} label="Tailwind" />
);
