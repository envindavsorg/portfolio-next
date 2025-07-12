'use client';

import { WifiSlashIcon } from '@phosphor-icons/react/ssr';
import { motion, AnimatePresence } from 'motion/react';
import { useOfflineStatus } from '@/hooks/useOfflineStatus';

export function OfflineIndicator() {
	const { isOffline, wasOffline, isOnline } = useOfflineStatus();

	return (
		<AnimatePresence>
			{isOffline && (
				<motion.div
					initial={{ y: -100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -100, opacity: 0 }}
					className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-md"
				>
					<div className="flex items-center gap-3 rounded-lg bg-red-500 px-4 py-3 text-white shadow-lg">
						<WifiSlashIcon className="size-5 shrink-0" />
						<div className="flex-1">
							<p className="font-medium text-sm">
								Connexion perdue
							</p>
							<p className="text-red-100 text-xs">
								Vous naviguez hors ligne
							</p>
						</div>
					</div>
				</motion.div>
			)}
			
			{isOnline && wasOffline && (
				<motion.div
					initial={{ y: -100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -100, opacity: 0 }}
					transition={{ delay: 0.5 }}
					className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-md"
					onAnimationComplete={() => {
						// Auto-hide after 3 seconds
						setTimeout(() => {
							// This will need to be managed by parent component
						}, 3000);
					}}
				>
					<div className="flex items-center gap-3 rounded-lg bg-green-500 px-4 py-3 text-white shadow-lg">
						<div className="size-2 rounded-full bg-green-200 animate-pulse" />
						<div className="flex-1">
							<p className="font-medium text-sm">
								Connexion rétablie
							</p>
							<p className="text-green-100 text-xs">
								Vous êtes de nouveau en ligne
							</p>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}