import airpodsMax from '@/images/hardware/airpods-max.webp';
import airpodsPro from '@/images/hardware/airpods-pro-2.webp';
import watch from '@/images/hardware/apple-watch-ultra-2.webp';
import homepod from '@/images/hardware/homepod.webp';
import ipad from '@/images/hardware/ipad.webp';
import iphone from '@/images/hardware/iphone.webp';
import macbook from '@/images/hardware/macbook-pro-m3.webp';
import keyboard from '@/images/hardware/magic-keyboard.webp';
import mouse from '@/images/hardware/magic-mouse.webp';
import trackpad from '@/images/hardware/magic-trackpad.webp';
import pencil from '@/images/hardware/pencil.webp';
import screen from '@/images/hardware/pro-display.webp';
import type { StaticImageData } from 'next/image';

interface Hardware {
	description: string;
	title: string;
	image: StaticImageData;
	alt: string;
	link: string;
}

export const hardware: Hardware[] = [
	{
		description: 'Smartphone',
		title: 'iPhone 15 Pro Max',
		image: iphone,
		alt: 'Acheter',
		link: 'https://www.apple.com/fr/shop/buy-iphone/iphone-15-pro',
	},
	{
		description: 'Ordinateur',
		title: 'Macbook Pro M3 Pro',
		image: macbook,
		alt: 'Acheter',
		link: 'https://www.apple.com/fr/shop/buy-mac/macbook-pro/16-pouces-noir-sid%C3%A9ral-puce-apple-m3-pro-avec-cpu-12-c%C5%93urs-et-gpu-18-c%C5%93urs-36-go-de-m%C3%A9moire-512go',
	},
	{
		description: 'Clavier',
		title: 'Magic Keyboard 2',
		image: keyboard,
		alt: 'Acheter',
		link: 'https://www.apple.com/fr/shop/product/MMMR3F/A/magic-keyboard-avec-touch-id-et-pav%C3%A9-num%C3%A9rique-pour-les-mac-avec-puce-apple-fran%C3%A7ais-touches-noires?fnode=b1d7ad889af738c6f17fb3195fbada4e5010d9a592316539c396e31c016affab9cb6221f7c9352730b705ce8896ac27aec007ccc47b560ec00de7b801b427c099337e7a9b18e17bbbb642f2e888bc488767a37fc92b08e836333b3126382ef02',
	},
	{
		description: 'Souris',
		title: 'Magic Mouse 2',
		image: mouse,
		alt: 'Acheter',
		link: 'https://www.apple.com/fr/shop/product/MMMQ3Z/A/magic-mouse-surface-multi-touch-noir?fnode=b1d7ad889af738c6f17fb3195fbada4e5010d9a592316539c396e31c016affab9cb6221f7c9352730b705ce8896ac27aec007ccc47b560ec00de7b801b427c099337e7a9b18e17bbbb642f2e888bc488767a37fc92b08e836333b3126382ef02',
	},
	{
		description: 'Trackpad',
		title: 'Magic Trackpad 2',
		image: trackpad,
		alt: 'Acheter',
		link: 'https://www.apple.com/fr/shop/product/MMMP3Z/A/magic-trackpad-surface-multi-touch-noir?fnode=b1d7ad889af738c6f17fb3195fbada4e5010d9a592316539c396e31c016affab9cb6221f7c9352730b705ce8896ac27aec007ccc47b560ec00de7b801b427c099337e7a9b18e17bbbb642f2e888bc488767a37fc92b08e836333b3126382ef02',
	},
	{
		description: 'Écran externe',
		title: 'Apple Pro Display XDR',
		image: screen,
		alt: 'Acheter',
		link: 'https://www.apple.com/fr/shop/buy-mac/pro-display-xdr',
	},
	{
		description: 'Écouteurs',
		title: 'AirPods Pro 2',
		image: airpodsPro,
		alt: 'Acheter',
		link: 'https://www.apple.com/fr/shop/product/MTJV3ZM/A/airpods-pro',
	},
	{
		description: 'Casque audio',
		title: 'AirPods Max',
		image: airpodsMax,
		alt: 'Acheter',
		link: 'https://www.apple.com/fr/shop/buy-airpods/airpods-max',
	},
	{
		description: 'Montre connectée',
		title: 'Apple Watch Ultra 2',
		image: watch,
		alt: 'Acheter',
		link: 'https://www.apple.com/fr/shop/buy-watch/apple-watch-ultra',
	},
	{
		description: 'Tablette',
		title: 'iPad Pro 11',
		image: ipad,
		alt: 'Acheter',
		link: 'https://www.apple.com/fr/shop/buy-ipad/ipad-pro',
	},
	{
		description: 'Stylet',
		title: 'Apple Pencil Pro',
		image: pencil,
		alt: 'Acheter',
		link: 'https://www.apple.com/fr/shop/product/MX2D3ZM/A/apple-pencil-pro',
	},
	{
		description: 'Enceinte',
		title: 'HomePod Mini',
		image: homepod,
		alt: 'Acheter',
		link: 'https://www.apple.com/fr/shop/buy-homepod/homepod-mini/jaune',
	},
];
