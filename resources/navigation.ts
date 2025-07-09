import { routes } from '@/resources/config';

export type RouteKey = keyof typeof routes;

export interface Navigation {
	readonly name: string;
	readonly description: string;
	readonly link: RouteKey;
	readonly position?: number;
}

const data = [
	{
		name: 'Accueil',
		description: 'Page d’accueil de mon site',
		link: '/' as const,
	},
	{
		name: 'Travail',
		description: 'Mon parcours professionnel',
		link: '/work' as const,
	},
	{
		name: 'Compétences',
		description: 'Mes compétences et technologies',
		link: '/stack' as const,
	},
	{
		name: 'Activité',
		description: 'Mon activité sur GitHub',
		link: '/github' as const,
	},
	{
		name: 'Blog',
		description: 'Mes articles de blog',
		link: '/blog' as const,
	},
	{
		name: 'Contact',
		description: 'N’hésitez pas à me contacter',
		link: '/contact' as const,
	},
] as const satisfies ReadonlyArray<Pick<Navigation, 'name' | 'description' | 'link'>>;

const TOTAL_LINES = 30 as const;
const LINE_SPACING = 4 as const;
const activeItems = data.filter((navItem) => routes[navItem.link]);
const totalUsedLines = activeItems.length * (LINE_SPACING + 1);

const SIDEBAR_NUM_LINES =
	totalUsedLines <= TOTAL_LINES ? totalUsedLines : TOTAL_LINES;

export const navigation: Navigation[] = activeItems.map((navItem, index) => ({
	...navItem,
	position: 1 + index * (LINE_SPACING + 1),
}));

export { SIDEBAR_NUM_LINES };
