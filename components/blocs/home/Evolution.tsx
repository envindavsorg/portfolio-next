import type React from 'react';
import { memo, useMemo } from 'react';
import { FadeIn } from '@/components/blocs/FadeIn';
import PageParagraph from '@/components/text/PageParagraph';
import { Status, StatusIndicator, StatusLabel } from '@/components/ui/Status';

export const Evolution = memo((): React.JSX.Element => {
	const formattedDateMemo = useMemo(
		() =>
			new Date().toLocaleDateString('fr-FR', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			}),
		[],
	);

	return (
		<FadeIn className="flex flex-col gap-y-3">
			<Status status="online">
				<StatusIndicator />
				<StatusLabel>en cours d'évolution</StatusLabel>
			</Status>
			<h3 className="mt-3 font-semibold text-foreground text-xl">
				Portfolio en perpétuelle évolution
			</h3>
			<PageParagraph>
				Ce portfolio est bien plus qu'une simple vitrine : c'est un écosystème vivant qui
				grandit avec moi. Chaque nouveau projet, chaque compétence acquise, chaque
				expérience vécue vient enrichir cet espace numérique. Comme un jardin digital, il
				fleurit continuellement avec mes découvertes, mes créations et mes aventures dans
				le monde du développement.
				<span className="mt-2 block font-medium text-foreground">
					N'hésitez pas à revenir de temps en temps pour découvrir les nouveautés et
					suivre l'évolution de mes créations ! 🌱
				</span>
			</PageParagraph>
			<div className="mt-6 flex items-center gap-2 text-muted-foreground text-sm">
				<span>Dernière mise à jour :</span>
				<time className="font-medium text-foreground">{formattedDateMemo}</time>
			</div>
		</FadeIn>
	);
});
