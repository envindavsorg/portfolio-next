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
} from '@/components/ui/kibo-ui/Snippet';

interface TerminalCommandProps extends ComponentPropsWithoutRef<'code'> {
	command: string;
}

const generateTerminalVariants = (command: string) => {
	const commands = [
		{ label: 'bash', code: command, shell: 'bash' },
		{ label: 'zsh', code: command, shell: 'zsh' },
		{ label: 'fish', code: command, shell: 'fish' },
		{ label: 'powershell', code: command, shell: 'powershell' },
	];

	return commands.map((cmd) => {
		let modifiedCode = cmd.code;

		if (cmd.shell === 'powershell') {
			if (modifiedCode.startsWith('ls ')) {
				modifiedCode = modifiedCode.replace('ls ', 'Get-ChildItem ');
			} else if (modifiedCode === 'ls') {
				modifiedCode = 'Get-ChildItem';
			} else if (modifiedCode.startsWith('cat ')) {
				modifiedCode = modifiedCode.replace('cat ', 'Get-Content ');
			} else if (modifiedCode.startsWith('grep ')) {
				modifiedCode = modifiedCode.replace('grep ', 'Select-String ');
			} else if (modifiedCode.startsWith('find ')) {
				modifiedCode = modifiedCode.replace('find ', 'Get-ChildItem -Recurse ');
			} else if (modifiedCode.startsWith('rm ')) {
				modifiedCode = modifiedCode.replace('rm ', 'Remove-Item ');
			} else if (modifiedCode.startsWith('cp ')) {
				modifiedCode = modifiedCode.replace('cp ', 'Copy-Item ');
			} else if (modifiedCode.startsWith('mv ')) {
				modifiedCode = modifiedCode.replace('mv ', 'Move-Item ');
			} else if (modifiedCode.startsWith('mkdir ')) {
				modifiedCode = modifiedCode.replace(
					'mkdir ',
					'New-Item -ItemType Directory -Name ',
				);
			}
		}

		if (cmd.shell === 'fish') {
			if (modifiedCode.includes('&&')) {
				modifiedCode = modifiedCode.replace(/&&/g, '; and');
			}
			if (modifiedCode.includes('||')) {
				modifiedCode = modifiedCode.replace(/\|\|/g, '; or');
			}
		}

		return {
			...cmd,
			code: modifiedCode,
		};
	});
};

export const TerminalCommand = ({ command }: TerminalCommandProps): React.JSX.Element => {
	const commands = generateTerminalVariants(command);
	const [value, setValue] = useState(commands[0].label);
	const activeCommand = commands.find((cmd) => cmd.label === value);

	return (
		<Snippet onValueChange={setValue} value={value} className="my-6">
			<SnippetHeader>
				<div className="flex items-center gap-x-3">
					<TerminalWindowIcon className="size-5" />
					<SnippetTabsList>
						{commands.map((cmd) => (
							<SnippetTabsTrigger key={cmd.label} value={cmd.label}>
								{cmd.label}
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
			{commands.map((cmd) => (
				<SnippetTabsContent key={cmd.label} value={cmd.label}>
					{cmd.code}
				</SnippetTabsContent>
			))}
		</Snippet>
	);
};
