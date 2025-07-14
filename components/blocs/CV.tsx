'use client';

import {
	CopyIcon,
	EyeIcon,
	FileArrowDownIcon,
	SparkleIcon,
} from '@phosphor-icons/react/ssr';
import { motion } from 'motion/react';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { FadeIn } from '@/components/blocs/FadeIn';
import {
	FloatingPanelBody,
	FloatingPanelCloseButton,
	FloatingPanelContent,
	FloatingPanelFooter,
	FloatingPanelRoot,
	FloatingPanelTrigger,
} from '@/components/blocs/FloatingPanel';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { name } from '@/resources/config';

const CV_CONFIG = {
	filePath: '/cv-cuzeac-florin.pdf',
	title: 'CV - Cuzeac Florin',
	shareText:
		"Découvrez le profil de Florin Cuzeac, développeur full-stack avec 10 ans d'expérience !",
} as const;

interface PDFMetadata {
	pages: number;
	sizeKB: number;
	lastModified: string;
}

export type CVProps = React.HTMLProps<HTMLElement> & {
	className?: string;
};

export const CV: React.FC<CVProps> = ({ className }) => {
	const reducedMotion = useReducedMotion();
	const [pdfMetadata, setPdfMetadata] = useState<PDFMetadata>({
		pages: 2,
		sizeKB: 0,
		lastModified: new Date().toLocaleDateString('fr-FR'),
	});

	const pdfUrl = CV_CONFIG.filePath;

	useEffect(() => {
		const fetchPDFMetadata = async () => {
			try {
				const response = await fetch('/api/cv/metadata');
				if (response.ok) {
					const metadata = await response.json();
					setPdfMetadata(metadata);
				}
			} catch (error) {
				// PDF metadata fetch failed - using defaults
			}
		};

		fetchPDFMetadata();
	}, []);

	const handleView = useCallback(() => {
		window.open(pdfUrl, '_blank', 'noopener,noreferrer');
	}, [pdfUrl]);

	const handleDownload = useCallback(() => {
		const link = document.createElement('a');
		link.href = pdfUrl;
		link.download = 'CV-Cuzeac-Florin.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}, [pdfUrl]);

	const handleCopy = useCallback(async () => {
		try {
			const copyUrl = `${window.location.origin}${pdfUrl}`;
			await navigator.clipboard.writeText(copyUrl);
			toast.success('Lien copié dans le presse-papiers !', {
				description: 'Vous pouvez maintenant partager ce lien',
			});
		} catch (error) {
			toast.error('Erreur lors de la copie', {
				description: 'Impossible de copier le lien',
			});
		}
	}, [pdfUrl]);

	return (
		<FadeIn>
			<FloatingPanelRoot className={className}>
				<FloatingPanelTrigger title="Découvrez mon CV" />
				<FloatingPanelContent className="h-auto w-full max-w-2xl overflow-hidden">
					<FloatingPanelBody className="flex flex-col gap-4 pt-1 pb-1 md:flex-row md:items-stretch md:gap-6 md:pt-5 md:pb-2">
						<motion.div
							initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={
								reducedMotion ? { duration: 0 } : { delay: 0.05, duration: 0.2 }
							}
							className="flex-1"
							style={{ willChange: 'transform, opacity' }}
						>
							<div className="group relative hidden h-full flex-col justify-center rounded-xl border border-neutral-200/50 bg-white/90 p-4 md:flex dark:border-neutral-700/50 dark:bg-black/90">
								<div className="relative flex items-center gap-3 overflow-hidden">
									<div className="flex size-14 items-center justify-center rounded-xl border border-neutral-200/50 bg-white/20 ring-1 ring-black/5 dark:border-neutral-700/50 dark:bg-white/10">
										<div className="font-bold text-base">CV</div>
									</div>
									<div className="flex flex-1 flex-col gap-y-0.5">
										<h3 className="font-bold text-foreground text-lg">{name}</h3>
										<p className="text-muted-foreground text-xs">développeur front-end</p>
									</div>
								</div>
								<div className="mt-4">
									<div className="flex items-center gap-x-2">
										<SparkleIcon className="size-4 text-theme" />
										<span className="text-sm">10 ans d'expérience</span>
									</div>
									<div className="mt-6">
										<p className="text-muted-foreground text-xs">
											Téléchargez, visualisez ou partagez mon CV à l'aide des actions
											ci-dessous.
										</p>
									</div>
								</div>
							</div>
						</motion.div>

						<motion.div
							initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={reducedMotion ? { duration: 0 } : { delay: 0.1, duration: 0.2 }}
							className="flex-1"
							style={{ willChange: 'transform, opacity' }}
						>
							<div className="flex h-full flex-col gap-2.5">
								<motion.button
									initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
									animate={{ opacity: 1, y: 0 }}
									transition={
										reducedMotion ? { duration: 0 } : { delay: 0.15, duration: 0.2 }
									}
									onClick={handleView}
									className="group relative cursor-pointer overflow-hidden rounded-lg border border-neutral-200/50 bg-white/20 p-3 text-left text-white ring-1 ring-black/5 transition-colors duration-150 active:scale-[0.99] md:hover:scale-[1.01] md:transition-all md:duration-200 dark:border-neutral-700/50 dark:bg-white/10"
									style={{ willChange: 'transform, opacity' }}
								>
									<div className="absolute inset-0 origin-left scale-x-0 transform bg-white/10 transition-transform duration-200 md:group-hover:scale-x-100" />
									<div className="relative z-10 flex flex-row-reverse items-center gap-3 max-md:justify-between md:flex-row">
										<EyeIcon className="h-5 w-5 flex-shrink-0" weight="duotone" />
										<div className="hidden md:block">
											<div className="font-medium text-sm md:text-base">Visualiser</div>
											<div className="text-xs opacity-90">dans une nouvelle fenêtre</div>
										</div>
										<div className="font-medium text-sm md:hidden md:text-base">
											Visualiser le CV
										</div>
									</div>
								</motion.button>

								<motion.button
									initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
									animate={{ opacity: 1, y: 0 }}
									transition={
										reducedMotion ? { duration: 0 } : { delay: 0.2, duration: 0.2 }
									}
									onClick={handleDownload}
									className="group relative cursor-pointer overflow-hidden rounded-lg border border-neutral-200/50 bg-white/20 p-3 text-left text-white ring-1 ring-black/5 transition-colors duration-150 active:scale-[0.99] md:hover:scale-[1.01] md:transition-all md:duration-200 dark:border-neutral-700/50 dark:bg-white/10"
									style={{ willChange: 'transform, opacity' }}
								>
									<div className="absolute inset-0 origin-left scale-x-0 transform bg-white/10 transition-transform duration-200 md:group-hover:scale-x-100" />
									<div className="relative z-10 flex flex-row-reverse items-center gap-3 max-md:justify-between md:flex-row">
										<FileArrowDownIcon
											className="h-5 w-5 flex-shrink-0"
											weight="duotone"
										/>
										<div className="hidden md:block">
											<div className="font-medium text-sm md:text-base">Télécharger</div>
											<div className="text-xs opacity-90">sur votre appareil</div>
										</div>
										<div className="font-medium text-sm md:hidden md:text-base">
											Télécharger le CV
										</div>
									</div>
								</motion.button>

								<motion.button
									initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
									animate={{ opacity: 1, y: 0 }}
									transition={
										reducedMotion ? { duration: 0 } : { delay: 0.25, duration: 0.2 }
									}
									onClick={handleCopy}
									className="group relative cursor-pointer overflow-hidden rounded-lg border border-neutral-200/50 bg-white/20 p-3 text-left text-white ring-1 ring-black/5 transition-colors duration-150 active:scale-[0.99] md:hover:scale-[1.01] md:transition-all md:duration-200 dark:border-neutral-700/50 dark:bg-white/10"
									style={{ willChange: 'transform, opacity' }}
								>
									<div className="absolute inset-0 origin-left scale-x-0 transform bg-white/10 transition-transform duration-200 md:group-hover:scale-x-100" />
									<div className="relative z-10 flex flex-row-reverse items-center gap-3 max-md:justify-between md:flex-row">
										<CopyIcon className="h-5 w-5 flex-shrink-0" weight="duotone" />
										<div className="hidden md:block">
											<div className="font-medium text-sm md:text-base">
												Copier le lien
											</div>
											<div className="text-xs opacity-90">dans le presse-papiers</div>
										</div>
										<div className="font-medium text-sm md:hidden md:text-base">
											Copier le lien et partager
										</div>
									</div>
								</motion.button>
							</div>
						</motion.div>
					</FloatingPanelBody>

					<FloatingPanelFooter className="mt-3 border-neutral-200/50 border-t pt-3 dark:border-neutral-700/50">
						<motion.div
							initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							transition={reducedMotion ? { duration: 0 } : { delay: 0.3, duration: 0.2 }}
							className="flex w-full items-center justify-between"
							style={{ willChange: 'transform, opacity' }}
						>
							<FloatingPanelCloseButton />
							<div className="text-muted-foreground text-xs">
								PDF • {pdfMetadata.pages} pages •{' '}
								{pdfMetadata.sizeKB > 0 ? `${pdfMetadata.sizeKB} KB` : ''} •{' '}
								{pdfMetadata.lastModified}
							</div>
						</motion.div>
					</FloatingPanelFooter>
				</FloatingPanelContent>
			</FloatingPanelRoot>
		</FadeIn>
	);
};
