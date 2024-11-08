'use client';

import {
	ArrowsOut,
	ArrowsOutCardinal,
	CloudMoon,
	Smiley,
	Sun,
} from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import type React from 'react';
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { toast } from 'sonner';

type CommandContextProps = {
	toggleTheme: () => void;
	getThemeIcon: () => React.ReactElement;
	fullscreen: () => void;
	getScreenIcon: () => React.ReactElement;
	closeWindow: () => void;
	runCommand: (command: () => unknown) => void;
	open: boolean;
	setOpen: (open: boolean) => void;
};

const CommandContext = createContext<CommandContextProps | undefined>(
	undefined,
);

interface CommandProvider {
	children: React.ReactNode;
}

export const CommandProvider = ({
	children,
}: CommandProvider): React.JSX.Element => {
	const { systemTheme, theme, setTheme } = useTheme();
	const [currentTheme, setCurrentTheme] = useState<string | undefined>(
		undefined,
	);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const down = (event: KeyboardEvent) => {
			if (
				(event.key === 'k' && (event.metaKey || event.ctrlKey)) ||
				event.key === '/'
			) {
				if (
					(event.target instanceof HTMLElement &&
						event.target.isContentEditable) ||
					event.target instanceof HTMLInputElement ||
					event.target instanceof HTMLTextAreaElement ||
					event.target instanceof HTMLSelectElement
				) {
					return;
				}

				event.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	useEffect(() => {
		setCurrentTheme(theme === 'system' ? systemTheme : theme);
	}, [theme, systemTheme]);

	const toggleTheme = (): void => {
		if (currentTheme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	};

	const getThemeIcon = (): React.ReactElement =>
		currentTheme === 'dark' ? (
			<Sun
				weight="duotone"
				className="size-5 shrink-0 text-foreground sm:size-6"
			/>
		) : (
			<CloudMoon
				weight="duotone"
				className="size-5 shrink-0 text-foreground sm:size-6"
			/>
		);

	const [isFullscreen, setIsFullscreen] = useState(false);

	const fullscreen = (): void => {
		if (document.fullscreenElement) {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
			setIsFullscreen(false);
		} else {
			document.documentElement.requestFullscreen();
			setIsFullscreen(true);
		}
	};

	const getScreenIcon = (): React.ReactElement =>
		isFullscreen ? (
			<ArrowsOutCardinal
				weight="duotone"
				className="size-5 shrink-0 text-foreground sm:size-6"
			/>
		) : (
			<ArrowsOut
				weight="duotone"
				className="size-5 shrink-0 text-foreground sm:size-6"
			/>
		);

	const closeWindow = (): void => {
		if (window.confirm('Voulez-vous vraiment fermer cette fenêtre ?')) {
			window.close();
		} else {
			toast.success('Très bien, je ne la ferme pas', {
				description: 'Vous avez toujours le choix !',
				duration: 5000,
				icon: <Smiley className="text-green-600 text-xl dark:text-green-300" />,
			});
		}
	};

	const runCommand = useCallback((command: () => unknown) => {
		command();
	}, []);

	const value = {
		toggleTheme,
		getThemeIcon,
		fullscreen,
		getScreenIcon,
		closeWindow,
		runCommand,
		open,
		setOpen,
	};

	return (
		<CommandContext.Provider value={value}>{children}</CommandContext.Provider>
	);
};

export const useCommandContext = (): CommandContextProps => {
	const context: CommandContextProps | undefined = useContext(CommandContext);
	if (!context) {
		throw new Error('useCommandContext must be used within a CommandProvider');
	}

	return context;
};
