'use client';

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
import { actions } from '@/resources/cv';
import { AnimatePresence, motion } from 'framer-motion';
import type React from 'react';

export type CVProps = React.HTMLProps<HTMLElement> & {
	className?: string;
};

export const CV: React.FC<CVProps> = ({ className }) => {
	return (
		<FadeIn>
			<FloatingPanelRoot className={className}>
				<FloatingPanelTrigger title="Télécharger mon CV" />
				<FloatingPanelContent className="flex w-52 flex-col justify-between">
					<FloatingPanelBody>
						<AnimatePresence>
							{actions.map(({ icon: Icon, label, action }, idx: number) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 10 }}
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
						</AnimatePresence>
					</FloatingPanelBody>
					<FloatingPanelFooter>
						<FloatingPanelCloseButton />
					</FloatingPanelFooter>
				</FloatingPanelContent>
			</FloatingPanelRoot>
		</FadeIn>
	);
};
