'use client';

import { Motion } from '@/components/motion/Motion';
import {
	defaultVariants,
	variantsFive,
	variantsFour,
	variantsSeven,
	variantsSix,
	variantsThree,
	variantsTwo,
} from '@/components/motion/variants';
import { Card } from '@/components/ui/Card';
import {
	CalendarCheck,
	ChartPie,
	GitCommit,
	Trophy,
	UserPlus,
	UsersThree,
} from '@phosphor-icons/react/dist/ssr';
import { motion } from 'framer-motion';
import type React from 'react';

interface Props {
	followers: number;
	following: number;
	totalContributions: number;
	contributions: number[];
	contributionsThisWeek: number;
}

export const GitHubStatsClient = ({
	followers,
	following,
	totalContributions,
	contributions,
	contributionsThisWeek,
}: Props) => (
	<Motion className="flex flex-col" asChild variants={defaultVariants}>
		<div className="grid grid-cols-4 gap-3">
			<motion.div
				className="col-span-full sm:col-span-2"
				variants={variantsTwo}
			>
				<Card
					tag="static"
					icon={<GitCommit className="text-theme" weight="duotone" />}
					title={`${totalContributions} commit${totalContributions > 1 ? 's' : ''}`}
					comment="(sur l'année)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
			</motion.div>
			<motion.div
				className="col-span-full sm:col-span-2"
				variants={variantsThree}
			>
				<Card
					tag="static"
					icon={<CalendarCheck className="text-theme" weight="duotone" />}
					title={`${contributionsThisWeek} commit${contributionsThisWeek > 1 ? 's' : ''}`}
					comment="(cette semaine)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
			</motion.div>
			<motion.div
				className="col-span-full sm:col-span-2"
				variants={variantsFour}
			>
				<Card
					tag="static"
					icon={<Trophy className="text-theme" weight="duotone" />}
					title={`${Math.max(...contributions)} commit${Math.max(...contributions) > 1 ? 's' : ''}`}
					comment="(en un jour)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
			</motion.div>
			<motion.div
				className="col-span-full sm:col-span-2"
				variants={variantsFive}
			>
				<Card
					tag="static"
					icon={<ChartPie className="text-theme" weight="duotone" />}
					title={`${Math.round(totalContributions / contributions.length)} commit${Math.round(totalContributions / contributions.length) > 1 ? 's' : ''}`}
					comment="(en moyenne par jour)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
			</motion.div>
			<motion.div
				className="col-span-full sm:col-span-2"
				variants={variantsSix}
			>
				<Card
					tag="static"
					icon={<UsersThree className="text-theme" weight="duotone" />}
					title={`${followers} abonné${followers > 1 ? 's' : ''}`}
					comment="(sur GitHub)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
			</motion.div>
			<motion.div
				className="col-span-full sm:col-span-2"
				variants={variantsSeven}
			>
				<Card
					tag="static"
					icon={<UserPlus className="text-theme" weight="duotone" />}
					title={`${following} abonnement${following > 1 ? 's' : ''}`}
					comment="(sur GitHub)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
			</motion.div>
		</div>
	</Motion>
);
