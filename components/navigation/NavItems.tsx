export type NavItems = {
	name: string;
	description: string;
	link: string;
	position: number;
};

export const navItems: NavItems[] = [
	{
		name: 'Accueil',
		description: 'Page d’accueil de mon site',
		link: '/',
		position: 1,
	},
	{
		name: 'Travail',
		description: 'Mon parcours professionnel',
		link: '/work',
		position: 7,
	},
	{
		name: 'Compétences',
		description: 'Mes compétences et technologies',
		link: '/stack',
		position: 14,
	},
	{
		name: 'Blog',
		description: 'Mes articles de blog',
		link: '/blog',
		position: 20,
	},
	{
		name: 'Contact',
		description: 'N’hésitez pas à me contacter',
		link: '/contact',
		position: 25,
	},
];
