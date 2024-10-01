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
	thisYear: number;
	thisWeek: number;
	bestDay: number;
	perDay: number;
}

export const Stats = ({
	followers,
	following,
	thisYear,
	thisWeek,
	bestDay,
	perDay,
}: Props) => (
	<Motion className="flex flex-col" asChild variants={defaultVariants}>
		<div className="grid grid-cols-4 gap-3">
			<motion.div
				className="col-span-full min-[530px]:col-span-2"
				variants={variantsTwo}
			>
				<Card
					tag="static"
					icon={<GitCommit className="text-theme" weight="duotone" />}
					title={`${thisYear} commit${thisYear > 1 ? 's' : ''}`}
					comment="(sur l'année)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
			</motion.div>
			<motion.div
				className="col-span-full min-[530px]:col-span-2"
				variants={variantsThree}
			>
				<Card
					tag="static"
					icon={<CalendarCheck className="text-theme" weight="duotone" />}
					title={`${thisWeek} commit${thisWeek > 1 ? 's' : ''}`}
					comment="(cette semaine)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
			</motion.div>
			<motion.div
				className="col-span-full min-[530px]:col-span-2"
				variants={variantsFour}
			>
				<Card
					tag="static"
					icon={<Trophy className="text-theme" weight="duotone" />}
					title={`${bestDay} commit${bestDay > 1 ? 's' : ''}`}
					comment="(en un jour)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
			</motion.div>
			<motion.div
				className="col-span-full min-[530px]:col-span-2"
				variants={variantsFive}
			>
				<Card
					tag="static"
					icon={<ChartPie className="text-theme" weight="duotone" />}
					title={`${perDay} commit${perDay > 1 ? 's' : ''}`}
					comment="(en moyenne par jour)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
			</motion.div>
			<motion.div
				className="col-span-full min-[530px]:col-span-2"
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
				className="col-span-full min-[530px]:col-span-2"
				variants={variantsSeven}
			>
				<Card
					tag="static"
					icon={<UserPlus className="text-theme" weight="duotone" />}
					title={`${following} suivi${following > 1 ? 's' : ''}`}
					comment="(sur GitHub)"
					className="flex flex-row-reverse items-center justify-between gap-3"
				/>
			</motion.div>
		</div>
	</Motion>
);
