'use client';

import {
	ExportIcon,
	EyeIcon,
	FileArrowDownIcon,
	SparkleIcon,
} from '@phosphor-icons/react/ssr';
import { motion } from 'motion/react';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import {
	FloatingPanelBody,
	FloatingPanelCloseButton,
	FloatingPanelContent,
	FloatingPanelFooter,
	FloatingPanelRoot,
	FloatingPanelTrigger,
} from '@/components/blocs/FloatingPanel';
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
	const [pdfMetadata, setPdfMetadata] = useState<PDFMetadata>({
		pages: 2,
		sizeKB: 0,
		lastModified: new Date().toLocaleDateString('fr-FR'),
	});
	const [isSharing, setIsSharing] = useState(false);

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
				console.warn('Could not fetch PDF metadata:', error);
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

	const handleShare = useCallback(async () => {
		if (isSharing) return;

		setIsSharing(true);

		try {
			const shareUrl = `${window.location.origin}${pdfUrl}`;

			if (navigator.share) {
				try {
					await navigator.share({
						title: CV_CONFIG.title,
						text: CV_CONFIG.shareText,
						url: shareUrl,
					});
				} catch (error) {
					if (error instanceof Error && error.name !== 'AbortError') {
						console.error('Share failed:', error);
						await navigator.clipboard?.writeText(shareUrl);
					}
				}
			} else {
				await navigator.clipboard?.writeText(shareUrl);
			}
		} finally {
			setTimeout(() => setIsSharing(false), 1000);
		}
	}, [pdfUrl, isSharing]);

	return (
		<FadeIn>
			<FloatingPanelRoot className={className}>
				<FloatingPanelTrigger title="Découvrez mon CV" />
				<FloatingPanelContent className="h-auto w-full max-w-2xl overflow-hidden">
					<FloatingPanelBody className="flex flex-col gap-4 pt-4 md:flex-row md:items-stretch md:gap-6 md:pt-5">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.1 }}
							className="flex-1"
						>
							<div className="group relative flex h-full flex-col justify-center rounded-xl border border-neutral-200/50 bg-white/80 p-4 backdrop-blur-sm dark:border-neutral-700/50 dark:bg-black/80">
								<div className="flex items-center gap-3">
									<div className="flex size-14 items-center justify-center rounded-xl border border-neutral-200/50 bg-white/20 ring-1 ring-black/5 dark:border-neutral-700/50 dark:bg-white/10">
										<div className="font-bold text-base">CV</div>
									</div>
									<div className="flex flex-1 flex-col gap-y-0.5">
										<h3 className="font-bold text-foreground text-lg">{name}</h3>
										<p className="text-muted-foreground text-xs">développeur front-end</p>
									</div>
								</div>
								<div className="mt-4 hidden md:block">
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
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2 }}
							className="flex-1"
						>
							<div className="flex h-full flex-col gap-2.5">
								<motion.button
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.3 }}
									onClick={handleView}
									className="group relative cursor-pointer overflow-hidden rounded-lg border border-neutral-200/50 bg-gradient-to-r bg-white/20 p-3 text-left text-white ring-1 ring-black/5 transition-all duration-300 hover:scale-[1.02] dark:border-neutral-700/50 dark:bg-white/10"
								>
									<div className="absolute inset-0 origin-left scale-x-0 transform bg-white/10 transition-transform duration-300 group-hover:scale-x-100" />
									<div className="relative z-10 flex items-center gap-3">
										<EyeIcon className="h-5 w-5 flex-shrink-0" weight="duotone" />
										<div>
											<div className="font-medium text-sm md:text-base">Visualiser</div>
											<div className="hidden text-xs opacity-90 md:block">
												dans une nouvelle fenêtre
											</div>
										</div>
									</div>
								</motion.button>

								<motion.button
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 }}
									onClick={handleDownload}
									className="group relative cursor-pointer overflow-hidden rounded-lg border border-neutral-200/50 bg-gradient-to-r bg-white/20 p-3 text-left text-white ring-1 ring-black/5 transition-all duration-300 hover:scale-[1.02] dark:border-neutral-700/50 dark:bg-white/10"
								>
									<div className="absolute inset-0 origin-left scale-x-0 transform bg-white/10 transition-transform duration-300 group-hover:scale-x-100" />
									<div className="relative z-10 flex items-center gap-3">
										<FileArrowDownIcon
											className="h-5 w-5 flex-shrink-0"
											weight="duotone"
										/>
										<div>
											<div className="font-medium text-sm md:text-base">Télécharger</div>
											<div className="hidden text-xs opacity-90 md:block">
												sur votre appareil
											</div>
										</div>
									</div>
								</motion.button>

								<motion.button
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.5 }}
									onClick={handleShare}
									disabled={isSharing}
									className={`group relative cursor-pointer overflow-hidden rounded-lg border border-neutral-200/50 bg-gradient-to-r bg-white/20 p-3 text-left text-white ring-1 ring-black/5 transition-all duration-300 hover:scale-[1.02] dark:border-neutral-700/50 dark:bg-white/10 ${isSharing ? 'cursor-not-allowed opacity-75' : ''}`}
								>
									<div className="absolute inset-0 origin-left scale-x-0 transform bg-white/10 transition-transform duration-300 group-hover:scale-x-100" />
									<div className="relative z-10 flex items-center gap-3">
										<ExportIcon className="h-5 w-5 flex-shrink-0" weight="duotone" />
										<div>
											<div className="font-medium text-sm md:text-base">
												{isSharing ? 'Partage en cours...' : 'Partager'}
											</div>
											<div className="hidden text-xs opacity-90 md:block">
												{isSharing ? 'Veuillez patienter' : 'ou copier le lien'}
											</div>
										</div>
									</div>
								</motion.button>
							</div>
						</motion.div>
					</FloatingPanelBody>

					<FloatingPanelFooter className="mt-3 border-neutral-200/50 border-t pt-3 dark:border-neutral-700/50">
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6 }}
							className="flex w-full items-center justify-between"
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
