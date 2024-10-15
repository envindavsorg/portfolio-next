import { routes } from '@/resources/config';

export type RouteKey = keyof typeof routes;

export type Navigation = {
	name: string;
	description: string;
	link: RouteKey;
	position?: number;
};

const data: Navigation[] = [
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
];

const TOTAL_LINES = 30;
const LINE_SPACING = 4;
const activeItems = data.filter((navItem) => routes[navItem.link]);
const totalUsedLines = activeItems.length * (LINE_SPACING + 1);

const SIDEBAR_NUM_LINES =
	totalUsedLines <= TOTAL_LINES ? totalUsedLines : TOTAL_LINES;

export const navigation: Navigation[] = activeItems.map((navItem, index) => ({
	...navItem,
	position: 1 + index * (LINE_SPACING + 1),
}));

export { SIDEBAR_NUM_LINES };
