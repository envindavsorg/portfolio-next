import ImageOptimizationInNext from '@/snippets/image-optimization.mdx';
import type React from 'react';

export const ImageOptimization = (): React.JSX.Element => (
	<>
		<p className="leading-8">
			L'optimisation des <span className="font-bold">images</span> est toujours
			un élément clé dans <span className="font-bold text-theme">Next.js</span>,
			et sur tous les sites web en général. Avec{' '}
			<span className="font-bold text-theme">next/image</span>, vous pouvez
			optimiser les images en utilisant des{' '}
			<span className="font-bold">formats optimisés</span> et en générant des
			images différentes selon les différents appareils.
		</p>
		<ImageOptimizationInNext />
	</>
);
