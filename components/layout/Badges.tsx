import { CSSIcon } from '@/components/icons/CSS';
import { HTML5Icon } from '@/components/icons/HTML';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { ReactIcon } from '@/components/icons/React';
import { TailwindIcon } from '@/components/icons/Tailwind';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import { VueIcon } from '@/components/icons/Vue';
import { Badge } from '@/components/ui/Badge';
import type React from 'react';
import { useMemo } from 'react';

type BadgeWithIconProps = {
	type: 'html' | 'css' | 'js' | 'react' | 'vue' | 'ts' | 'tailwind';
};

const BADGE_CONFIG = {
	html: { icon: HTML5Icon, label: 'HTML' },
	css: { icon: CSSIcon, label: 'CSS' },
	js: { icon: JavaScriptIcon, label: 'JavaScript' },
	react: { icon: ReactIcon, label: 'React' },
	vue: { icon: VueIcon, label: 'Vue' },
	ts: { icon: TypeScriptIcon, label: 'TypeScript' },
	tailwind: { icon: TailwindIcon, label: 'Tailwind' },
} as const;

export const BadgeWithIcon = ({
	type,
}: BadgeWithIconProps): React.JSX.Element => {
	const { icon: IconComponent, label } = useMemo(() => {
		return BADGE_CONFIG[type] || { icon: null, label: '' };
	}, [type]);

	if (!IconComponent) {
		return <Badge>{label}</Badge>;
	}

	return (
		<Badge className="inline-flex items-center gap-1.5 align-middle">
			<IconComponent className="size-3.5 flex-shrink-0" />
			<span className="leading-none">{label}</span>
		</Badge>
	);
};
