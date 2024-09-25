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
		name: 'Professionnel',
		description: 'Mon parcours professionnel',
		link: '/work',
		position: 8,
	},
	{
		name: 'Mes projets',
		description: 'Mes projets réalisés au fil du temps',
		link: '/activity',
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
