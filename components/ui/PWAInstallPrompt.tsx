'use client';

import { DownloadIcon, XIcon } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
	prompt(): Promise<void>;
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallPrompt = () => {
	const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
	const [showPrompt, setShowPrompt] = useState(false);
	const [isIOS, setIsIOS] = useState(false);
	const [isInstallable, setIsInstallable] = useState(false);

	useEffect(() => {
		// Check if device is iOS
		const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
		setIsIOS(isIOSDevice);

		// Check if already installed
		const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
		const isInstalled = (navigator as any).standalone || isStandalone;

		if (isInstalled) {
			return; // Don't show prompt if already installed
		}

		// For iOS devices, show manual install instructions
		if (isIOSDevice) {
			const hasBeenPrompted = localStorage.getItem('pwa-install-prompted-ios');
			if (!hasBeenPrompted) {
				setIsInstallable(true);
				setShowPrompt(true);
			}
			return;
		}

		// For Android/other browsers
		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault();
			setDeferredPrompt(e as BeforeInstallPromptEvent);
			setIsInstallable(true);
			
			const hasBeenPrompted = localStorage.getItem('pwa-install-prompted');
			if (!hasBeenPrompted) {
				setShowPrompt(true);
			}
		};

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

		return () => {
			window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
		};
	}, []);

	const handleInstallClick = async () => {
		if (isIOS) {
			// For iOS, we can't trigger install programmatically, just show instructions
			localStorage.setItem('pwa-install-prompted-ios', 'true');
			setShowPrompt(false);
			return;
		}

		if (!deferredPrompt) return;

		deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;
		
		localStorage.setItem('pwa-install-prompted', 'true');
		setDeferredPrompt(null);
		setShowPrompt(false);
	};

	const handleDismiss = () => {
		if (isIOS) {
			localStorage.setItem('pwa-install-prompted-ios', 'true');
		} else {
			localStorage.setItem('pwa-install-prompted', 'true');
		}
		setShowPrompt(false);
	};

	if (!isInstallable || !showPrompt) {
		return null;
	}

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 50 }}
				className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm"
			>
				<div className="rounded-lg border border-neutral-200/50 bg-white/95 p-4 shadow-lg backdrop-blur-sm dark:border-neutral-700/50 dark:bg-black/95">
					<div className="flex items-start gap-3">
						<div className="flex-shrink-0">
							<img
								src="/icon.png"
								alt="Cuzeac Florin"
								className="h-12 w-12 rounded-lg"
							/>
						</div>
						<div className="flex-1">
							<h3 className="font-semibold text-sm">Installer Cuzeac Florin</h3>
							<p className="text-muted-foreground text-xs mt-1">
								{isIOS 
									? "Appuyez sur le bouton de partage et sélectionnez 'Sur l'écran d'accueil'"
									: "Ajoutez cette app à votre écran d'accueil pour un accès rapide"
								}
							</p>
						</div>
						<button
							onClick={handleDismiss}
							className="flex-shrink-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
							aria-label="Fermer"
						>
							<XIcon className="h-4 w-4" />
						</button>
					</div>
					{!isIOS && (
						<div className="mt-3 flex gap-2">
							<button
								onClick={handleInstallClick}
								className="flex flex-1 items-center justify-center gap-2 rounded-md bg-foreground px-3 py-2 text-background text-sm font-medium transition-colors hover:bg-foreground/90"
							>
								<DownloadIcon className="h-4 w-4" />
								Installer
							</button>
						</div>
					)}
				</div>
			</motion.div>
		</AnimatePresence>
	);
};