import { DownloadSimple, Export, Eye } from '@phosphor-icons/react/dist/ssr';
import type { ComponentType, SVGProps } from 'react';

export interface Actions {
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	label: string;
	action: () => void;
}

export const actions: Actions[] = [
	{
		icon: Eye,
		label: 'Voir mon CV',
		action: () => {
			const url: string =
				'https://drive.google.com/file/d/1mD3zdZeeg9q4sQooyd8R1bsfZ8Uw_NIt/view?usp=share_link';
			window.open(url, '_blank');
		},
	},
	{
		icon: DownloadSimple,
		label: 'Télécharger',
		action: () => {
			const url: string =
				'https://drive.google.com/uc?export=download&id=1mD3zdZeeg9q4sQooyd8R1bsfZ8Uw_NIt';
			window.open(url, '_blank');
		},
	},
	{
		icon: Export,
		label: 'Partager',
		action: async () => {
			const url: string =
				'https://drive.google.com/file/d/1mD3zdZeeg9q4sQooyd8R1bsfZ8Uw_NIt/view?usp=share_link';
			await navigator.share({
				title: 'Check this out!',
				text: 'Here’s something interesting!',
				url,
			});
		},
	},
];
