'use client';

import { CommandMenu } from '@/components/command/CommandMenu';
import type { NavItems } from '@/components/navigation/NavItems';
import { NavbarMobileButton } from '@/components/navigation/modules/NavBarMobileButton';
import { useNavBarMobile } from '@/components/navigation/modules/NavBarProvider';
import { ThemeSwitch } from '@/components/theme/ThemeSwitch';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { env } from '@/env/client';
import useScroll from '@/hooks/useScroll';
import avatar from '@/images/avatar.webp';
import { cn, getRouterLastPathSegment } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type React from 'react';

interface NavBarProps {
	navItems: NavItems[];
	className?: string;
}

export const NavBar = ({ navItems, className }: NavBarProps) => {
	const { isOpen, toggleNavbar } = useNavBarMobile();
	const scrolled: boolean = useScroll(50);
	const pathname: string | null = usePathname();

	return (
		<>
			<div className="hidden items-center justify-end gap-x-6 lg:flex">
				<CommandMenu navItems={navItems} pathname={pathname} />
				<ThemeSwitch />
			</div>
			<div className="sticky top-4 z-50 w-full max-w-[60ch]">
				<motion.div
					initial={{
						opacity: 0,
						y: -20,
					}}
					animate={{
						y: 0,
						opacity: 1,
					}}
					transition={{
						duration: 0.5,
						delay: 0.4,
						ease: 'backOut',
					}}
					className={cn(
						'mx-auto flex items-center justify-between lg:hidden',
						'rounded-md border border-neutral-200 px-3.5 py-3 dark:border-neutral-700',
						scrolled ? 'backdrop-blur-xl' : 'bg-neutral-50 dark:bg-neutral-800',
						className,
					)}
				>
					<Image
						src={avatar}
						alt={`${env.NEXT_PUBLIC_NAME} ${env.NEXT_PUBLIC_SURNAME}`}
						className={cn(
							'size-8 rounded-full object-cover object-center transition-colors duration-200',
							scrolled
								? 'border border-theme'
								: 'border border-neutral-200 dark:border-neutral-700',
						)}
						priority
					/>

					<div className="flex items-center gap-x-4">
						<CommandMenu navItems={navItems} pathname={pathname} />
						<ThemeSwitch />

						<div className={className}>
							<DropdownMenu open={isOpen} onOpenChange={toggleNavbar}>
								<DropdownMenuTrigger
									asChild
									aria-label="Ouvrir le menu en mode mobile"
								>
									<NavbarMobileButton />
								</DropdownMenuTrigger>
								<AnimatePresence>
									{isOpen && (
										<DropdownMenuContent
											align="end"
											className="-mr-4 mt-4 flex w-44 flex-col gap-y-6 rounded-md px-3 py-1 lg:hidden"
											asChild
										>
											<motion.nav
												className="relative bg-neutral-50 dark:bg-neutral-800"
												initial={{
													opacity: 0,
												}}
												animate={{
													opacity: 1,
												}}
												exit={{
													opacity: 0,
												}}
												transition={{
													duration: 0.3,
												}}
											>
												<div className="divide-y divide-border">
													{navItems.map(
														({ link, name, description }, idx: number) => {
															const active: boolean =
																link === '/blog'
																	? pathname!.startsWith(link)
																	: getRouterLastPathSegment(pathname!) ===
																			link.split('/').pop() ||
																		getRouterLastPathSegment(pathname!) ===
																			link;

															return (
																<DropdownMenuItem
																	key={`mobile-link=${idx}`}
																	asChild
																	className="focus:!bg-transparent space-y-3 px-0 py-3"
																>
																	<motion.div
																		key={`${name}-${idx}`}
																		initial={{
																			scale: 0,
																			opacity: 0,
																		}}
																		animate={{
																			scale: 1,
																			opacity: 1,
																		}}
																		transition={{
																			type: 'spring',
																			stiffness: 260,
																			damping: 20,
																			delay: 0.1 + idx / 10,
																		}}
																	>
																		<Link
																			href={link}
																			aria-label={description}
																			className={cn(
																				'flex w-full items-center justify-between text-base',
																				active
																					? '*:font-bold *:text-theme'
																					: '*:font-normal *:text-foreground',
																			)}
																			onClick={toggleNavbar}
																		>
																			<p>/{name.toLowerCase()}</p>
																		</Link>
																	</motion.div>
																</DropdownMenuItem>
															);
														},
													)}
												</div>
											</motion.nav>
										</DropdownMenuContent>
									)}
								</AnimatePresence>
							</DropdownMenu>
						</div>
					</div>
				</motion.div>
			</div>
		</>
	);
};
