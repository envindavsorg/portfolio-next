import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type React from 'react';
import { useMemo } from 'react';
import { CSSIcon } from '@/components/icons/CSS';
import { HTML5Icon } from '@/components/icons/HTML';
import { JavaScriptIcon } from '@/components/icons/JavaScript';
import { NextJSIcon } from '@/components/icons/Next';
import { ReactIcon } from '@/components/icons/React';
import { TailwindIcon } from '@/components/icons/Tailwind';
import { TypeScriptIcon } from '@/components/icons/TypeScript';
import { VueIcon } from '@/components/icons/Vue';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
	'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2 py-0.5 font-medium text-xs transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3',
	{
		variants: {
			variant: {
				default:
					'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
				secondary:
					'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
				destructive:
					'border-transparent bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90',
				outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

const Badge = ({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<'span'> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) => {
	const Comp = asChild ? Slot : 'span';

	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
};

type BadgeWithIconProps = {
	type: 'html' | 'css' | 'js' | 'react' | 'next' | 'vue' | 'ts' | 'tailwind';
};

const BADGE_CONFIG = {
	html: { icon: HTML5Icon, label: 'HTML' },
	css: { icon: CSSIcon, label: 'CSS' },
	js: { icon: JavaScriptIcon, label: 'JavaScript' },
	react: { icon: ReactIcon, label: 'React' },
	next: { icon: NextJSIcon, label: 'Next.js' },
	vue: { icon: VueIcon, label: 'Vue.js' },
	ts: { icon: TypeScriptIcon, label: 'TypeScript' },
	tailwind: { icon: TailwindIcon, label: 'Tailwind.css' },
} as const;

const BadgeWithIcon = ({ type }: BadgeWithIconProps): React.JSX.Element => {
	const { icon: IconComponent, label } = useMemo(() => {
		return BADGE_CONFIG[type] || { icon: null, label: '' };
	}, [type]);

	if (!IconComponent) {
		return <Badge>{label}</Badge>;
	}

	return (
		<Badge
			className="inline-flex items-center gap-1.5 py-1.5 align-middle"
			variant="outline"
		>
			<IconComponent className="size-4 shrink-0" />
			<span className="leading-none">{label}</span>
		</Badge>
	);
};

export { Badge, BadgeWithIcon, badgeVariants };
