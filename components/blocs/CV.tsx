'use client';

import { DownloadSimpleIcon, ExportIcon, EyeIcon } from '@phosphor-icons/react/ssr';
import { motion } from 'motion/react';
import type React from 'react';
import type { ComponentType, SVGProps } from 'react';
import { useCallback, useMemo } from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import {
	FloatingPanelBody,
	FloatingPanelButton,
	FloatingPanelCloseButton,
	FloatingPanelContent,
	FloatingPanelFooter,
	FloatingPanelRoot,
	FloatingPanelTrigger,
} from '@/components/blocs/FloatingPanel';

const CV_CONFIG = {
	fileId: '1mD3zdZeeg9q4sQooyd8R1bsfZ8Uw_NIt',
	title: 'CV - Cuzeac Florin',
	shareText: 'Merci pour le partage. À bientôt !',
} as const;

interface Actions {
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	label: string;
	action: () => void | Promise<void>;
}

export type CVProps = React.HTMLProps<HTMLElement> & {
	className?: string;
};

export const CV: React.FC<CVProps> = ({ className }) => {
	const handleView = useCallback(() => {
		const url = `https://drive.google.com/file/d/${CV_CONFIG.fileId}/view?usp=share_link`;
		window.open(url, '_blank', 'noopener,noreferrer');
	}, []);

	const handleDownload = useCallback(() => {
		const url = `https://drive.google.com/uc?export=download&id=${CV_CONFIG.fileId}`;
		window.open(url, '_blank', 'noopener,noreferrer');
	}, []);

	const handleShare = useCallback(async () => {
		const url = `https://drive.google.com/file/d/${CV_CONFIG.fileId}/view?usp=share_link`;

		if (navigator.share) {
			try {
				await navigator.share({
					title: CV_CONFIG.title,
					text: CV_CONFIG.shareText,
					url,
				});
			} catch (error) {
				if (error instanceof Error && error.name !== 'AbortError') {
					console.error('Share failed:', error);
					navigator.clipboard?.writeText(url);
				}
			}
		} else {
			navigator.clipboard?.writeText(url);
		}
	}, []);

	const actions = useMemo(
		(): Actions[] => [
			{
				icon: EyeIcon,
				label: 'Visualiser',
				action: handleView,
			},
			{
				icon: DownloadSimpleIcon,
				label: 'Télécharger',
				action: handleDownload,
			},
			{
				icon: ExportIcon,
				label: 'Partager',
				action: handleShare,
			},
		],
		[handleView, handleDownload, handleShare],
	);

	return (
		<FadeIn>
			<FloatingPanelRoot className={className}>
				<FloatingPanelTrigger title="Découvrez mon CV" />
				<FloatingPanelContent className="flex w-52 flex-col justify-between">
					<FloatingPanelBody>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ staggerChildren: 0.1 }}
						>
							{actions.map(({ icon: Icon, label, action }, idx: number) => (
								<motion.div
									key={label}
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: idx * 0.1 }}
								>
									<FloatingPanelButton
										onClick={action}
										className="flex w-full items-center space-x-2 rounded-md px-2 py-1.5 transition-colors"
									>
										<Icon className="size-5 shrink-0" />
										<span>{label}</span>
									</FloatingPanelButton>
								</motion.div>
							))}
						</motion.div>
					</FloatingPanelBody>
					<FloatingPanelFooter>
						<FloatingPanelCloseButton />
					</FloatingPanelFooter>
				</FloatingPanelContent>
			</FloatingPanelRoot>
		</FadeIn>
	);
};
