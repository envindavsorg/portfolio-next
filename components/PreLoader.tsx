'use client';

import { name, title } from '@/resources/config';
import gsap from 'gsap';
import type React from 'react';
import { useEffect } from 'react';

export const PreLoader = (): React.JSX.Element => {
	useEffect(() => {
		const timeline = gsap.timeline();

		const animation = () => {
			timeline
				.to('#preloader-text', {
					duration: 0,
					opacity: 1,
					ease: 'Power3.easeOut',
				})
				.from('#preloader-text span', {
					duration: 1.5,
					delay: 1,
					y: 70,
					skewY: 10,
					stagger: 0.4,
					ease: 'Power3.easeOut',
				})
				.to('#preloader-text span', {
					duration: 1,
					y: 70,
					skewY: -20,
					stagger: 0.2,
					ease: 'Power3.easeOut',
				})
				.to('body', {
					duration: 0.01,
					css: {
						overflowY: 'scroll',
					},
					ease: 'power3.inOut',
				})
				.from('.sub', {
					duration: 1,
					opacity: 0,
					y: 80,
					ease: 'expo.easeOut',
				})
				.to(
					'#preloader',
					{
						duration: 1.5,
						height: '0vh',
						ease: 'Power3.easeOut',
						onComplete: mobileLanding,
					},
					'-=2',
				)
				.to('#preloader', {
					duration: 0,
					css: {
						display: 'none',
					},
				});
		};

		const mobileLanding = () => {
			if (window.innerWidth < 763) {
				timeline.from('.landing__main2', {
					duration: 1,
					delay: 0,
					opacity: 0,
					y: 80,
					ease: 'expo.easeOut',
				});
			}
		};

		animation();
	}, []);

	return (
		<div
			id="preloader"
			className="fixed inset-x-0 bottom-0 z-[9999] flex h-screen w-full items-center justify-center overflow-hidden bg-black text-white"
		>
			<div
				id="preloader-text"
				className="flex flex-col items-center justify-center gap-3 overflow-hidden opacity-0 md:flex-row"
			>
				<span className="font-extrabold font-hubot text-3xl md:text-4xl">
					{name}
				</span>
				<span className="hidden font-normal text-lg md:inline-block md:text-xl">
					/
				</span>
				<span className="hidden font-extrabold font-hubot text-3xl md:inline-block md:text-4xl">
					{title}
				</span>

				<div className="sub hidden" />
			</div>
		</div>
	);
};
