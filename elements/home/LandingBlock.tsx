'use client';

import { FadeIn } from '@/components/animations/FadeIn';
import { AnimatedTitle } from '@/components/blocs/AnimatedTitle';
import {
	FloatingPanelBody,
	FloatingPanelButton,
	FloatingPanelCloseButton,
	FloatingPanelContent,
	FloatingPanelFooter,
	FloatingPanelRoot,
	FloatingPanelTrigger,
} from '@/components/blocs/FloatingPanel';
import { display } from '@/resources/config';
import { name } from '@/resources/config';
import { actions } from '@/resources/cv';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import type React from 'react';
import type { ComponentClass, FunctionComponent } from 'react';

const LocationWidget: ComponentClass<object> | FunctionComponent<object> =
	dynamic(
		() =>
			import('@/components/widgets').then((mod) => ({
				default: mod.LocationWidget,
			})),
		{ ssr: false },
	);

export const LandingBlock = (): React.JSX.Element => (
	<>
		<div className="flex flex-col items-center gap-6 min-[530px]:flex-row">
			<div className="flex flex-col gap-y-3">
				<FadeIn>
					<AnimatedTitle words="Bonjour !!!" />
					<p className="leading-8">
						Je m'appelle{' '}
						<span className="font-bold">{name.trim().split(' ').pop()}</span>,
						j'ai{' '}
						<span className="font-bold">
							{new Date().getFullYear() - 1994} ans
						</span>{' '}
						et j'ai commencé à travailler sur le web en{' '}
						<span className="font-bold">2014</span> et je n'ai jamais arrêté
						depuis.
					</p>
				</FadeIn>

				<FadeIn>
					<FloatingPanelRoot className="mt-3">
						<FloatingPanelTrigger title="Télécharger mon CV">
							Télécharger mon CV
						</FloatingPanelTrigger>
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
												className="flex w-full items-center space-x-2 rounded-md px-2 py-1.5 transition-colors hover:bg-theme"
											>
												<Icon className="size-4" />
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
			</div>

			{display.location && (
				<FadeIn className="mt-3 flex w-full flex-col sm:mt-0">
					<LocationWidget />
				</FadeIn>
			)}
		</div>

		<FadeIn className="mt-12">
			<p className="leading-8">
				Je suis un <span className="font-bold text-theme">développeur</span> et{' '}
				<span className="font-bold text-theme">designer web</span> depuis{' '}
				<span className="font-bold">{new Date().getFullYear() - 2018} ans</span>
				, passionné par la création d’applications <span>belles</span> et{' '}
				<span>fonctionnelles</span>, le design et le développement web.
			</p>
		</FadeIn>

		<FadeIn className="mt-3">
			<p className="leading-8">
				J'ai décidé de créer ce site pour{' '}
				<span className="font-bold">partager mes expériences</span> et{' '}
				<span className="font-bold">mes compétences</span> avec tout le monde.
			</p>
		</FadeIn>
	</>
);
