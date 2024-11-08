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
	type: 'html' | 'css' | 'js' | 'react' | 'vue' | 'ts' | 'tailwind';
};

export const BadgeWithIcon = ({
	type,
}: BadgeWithIconProps): React.JSX.Element => {
	const getIconAndLabel = () => {
		switch (type) {
			case 'html':
				return { icon: <HTML5Icon />, label: 'HTML' };
			case 'css':
				return { icon: <CSSIcon />, label: 'CSS' };
			case 'js':
				return { icon: <JavaScriptIcon />, label: 'JavaScript' };
			case 'react':
				return { icon: <ReactIcon />, label: 'React' };
			case 'vue':
				return { icon: <VueIcon />, label: 'Vue' };
			case 'ts':
				return { icon: <TypeScriptIcon />, label: 'TypeScript' };
			case 'tailwind':
				return { icon: <TailwindIcon />, label: 'Tailwind' };
			default:
				return { icon: null, label: '' };
		}
	};

	const { icon, label } = getIconAndLabel();

	return (
		<Badge>
			{icon}
			&nbsp;{label}
		</Badge>
	);
};
