interface TreeViewElement {
	id: string;
	name: string;
	isSelectable?: boolean;
	children?: TreeViewElement[];
}

export const NextAppStructure: TreeViewElement[] = [
	{
		id: '1',
		isSelectable: true,
		name: 'app',
		children: [
			{
				id: '2',
				isSelectable: true,
				name: 'fonts',
				children: [
					{
						id: '3',
						isSelectable: true,
						name: 'GeistMonoVF.woff',
					},
					{
						id: '4',
						isSelectable: true,
						name: 'GeistVF.woff',
					},
				],
			},
			{
				id: '5',
				isSelectable: true,
				name: 'favicon.ico',
			},
			{
				id: '6',
				isSelectable: true,
				name: 'globals.css',
			},
			{
				id: '7',
				isSelectable: true,
				name: 'layout.tsx',
			},
			{
				id: '8',
				isSelectable: true,
				name: 'page.tsx',
			},
		],
	},
	{
		id: '9',
		isSelectable: false,
		name: 'node_modules',
		children: [],
	},
	{
		id: '10',
		isSelectable: false,
		name: '.gitignore',
	},
	{
		id: '11',
		isSelectable: false,
		name: 'next.config.mjs',
	},
	{
		id: '12',
		isSelectable: false,
		name: 'next-env.d.ts',
	},
	{
		id: '13',
		isSelectable: false,
		name: 'package.json',
	},
	{
		id: '14',
		isSelectable: false,
		name: 'package-lock.json',
	},
	{
		id: '15',
		isSelectable: false,
		name: 'postcss.config.mjs',
	},
	{
		id: '16',
		isSelectable: false,
		name: 'README.md',
	},
	{
		id: '17',
		isSelectable: false,
		name: 'tailwind.config.ts',
	},
	{
		id: '18',
		isSelectable: false,
		name: 'tsconfig.json',
	},
];

const og: TreeViewElement = {
	id: '19',
	isSelectable: true,
	name: 'og',
	children: [
		{
			id: '20',
			isSelectable: true,
			name: 'route.tsx',
		},
	],
};

// Clone NextAppStructure
const NextAppStructureOG: TreeViewElement[] = JSON.parse(
	JSON.stringify(NextAppStructure),
);

const appObjectOG: TreeViewElement | undefined = NextAppStructureOG.find(
	(item) => item.name === 'app',
);

if (appObjectOG?.children) {
	appObjectOG.children.push(og);
}

export { NextAppStructureOG };
