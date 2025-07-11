'use client';

import { TerminalWindowIcon } from '@phosphor-icons/react';
import type React from 'react';
import { type ComponentPropsWithoutRef, useState } from 'react';
import { toast } from 'sonner';
import {
	Snippet,
	SnippetCopyButton,
	SnippetHeader,
	SnippetTabsContent,
	SnippetTabsList,
	SnippetTabsTrigger,
} from '@/components/ui/Snippet';

interface PackageManagerProps extends ComponentPropsWithoutRef<'code'> {
	baseCommand: string;
}

const generateCommands = (baseCommand: string) => {
	const isNextCreate = baseCommand.includes('create-next-app');
	const isInstallCommand = baseCommand.match(/^(install|add|i)\b/);
	const isRunCommand = baseCommand.match(/^(run|start|dev|build|test)\b/);
	const isCreateCommand = baseCommand.includes('create-');

	if (isNextCreate) {
		return [
			{ label: 'npm', code: `npx ${baseCommand} --use-npm` },
			{ label: 'yarn', code: `npx ${baseCommand} --use-yarn` },
			{ label: 'pnpm', code: `npx ${baseCommand} --use-pnpm` },
			{ label: 'bun', code: `npx ${baseCommand} --use-bun` },
		];
	}

	if (isInstallCommand) {
		const packages = baseCommand.replace(/^(install|add|i)\s*/, '').trim();
		return [
			{ label: 'npm', code: packages ? `npm install ${packages}` : 'npm install' },
			{ label: 'yarn', code: packages ? `yarn add ${packages}` : 'yarn install' },
			{ label: 'pnpm', code: packages ? `pnpm add ${packages}` : 'pnpm install' },
			{ label: 'bun', code: packages ? `bun add ${packages}` : 'bun install' },
		];
	}

	if (isRunCommand) {
		const script = baseCommand.replace(/^run\s*/, '').trim();
		return [
			{ label: 'npm', code: `npm run ${script}` },
			{ label: 'yarn', code: `yarn ${script}` },
			{ label: 'pnpm', code: `pnpm ${script}` },
			{ label: 'bun', code: `bun run ${script}` },
		];
	}

	if (isCreateCommand) {
		return [
			{ label: 'npm', code: `npx ${baseCommand}` },
			{ label: 'yarn', code: `yarn create ${baseCommand.replace('create-', '')}` },
			{ label: 'pnpm', code: `pnpm create ${baseCommand.replace('create-', '')}` },
			{ label: 'bun', code: `bunx ${baseCommand}` },
		];
	}

	return [
		{ label: 'npm', code: `npx ${baseCommand}` },
		{ label: 'yarn', code: `yarn dlx ${baseCommand}` },
		{ label: 'pnpm', code: `pnpx ${baseCommand}` },
		{ label: 'bun', code: `bunx ${baseCommand}` },
	];
};

export const PackageManager = ({
	baseCommand,
}: PackageManagerProps): React.JSX.Element => {
	const commands = generateCommands(baseCommand);
	const [value, setValue] = useState(commands[0].label);
	const activeCommand = commands.find((command) => command.label === value);

	return (
		<Snippet onValueChange={setValue} value={value} className="my-6">
			<SnippetHeader>
				<div className="flex items-center gap-x-3">
					<TerminalWindowIcon className="size-5" />
					<SnippetTabsList>
						{commands.map((command) => (
							<SnippetTabsTrigger key={command.label} value={command.label}>
								{command.label}
							</SnippetTabsTrigger>
						))}
					</SnippetTabsList>
				</div>
				{activeCommand && (
					<SnippetCopyButton
						value={activeCommand.code}
						onCopy={() =>
							toast.success('Commande copiée avec succès !', {
								description: activeCommand.code,
							})
						}
						onError={() =>
							toast.error('Une erreur est survenue !', {
								description: activeCommand.code,
							})
						}
					/>
				)}
			</SnippetHeader>
			{commands.map((command) => (
				<SnippetTabsContent key={command.label} value={command.label}>
					{command.code}
				</SnippetTabsContent>
			))}
		</Snippet>
	);
};
