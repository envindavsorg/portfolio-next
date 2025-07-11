'use client';

import type React from 'react';
import { memo } from 'react';
import { toast } from 'sonner';
import {
	type BundledLanguage,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockFilename,
	CodeBlockHeader,
	CodeBlockItem,
	CodeBlock as KiboCodeBlock,
} from '@/components/ui/CodeBlock';

interface CodeBlockProps {
	language?: string;
	children: string;
	filename?: string;
	lineNumbers?: boolean;
}

export const CodeBlock = memo(
	({
		language,
		children,
		filename,
		lineNumbers = true,
	}: CodeBlockProps): React.JSX.Element => {
		const data = [
			{
				language: language || 'typescript',
				filename:
					filename ||
					`example.${language === 'typescript' ? 'ts' : language === 'javascript' ? 'js' : language || 'txt'}`,
				code: children,
			},
		];

		const currentData = data[0];

		return (
			<div className="my-6">
				<KiboCodeBlock defaultValue={language || 'typescript'} data={data}>
					<CodeBlockHeader>
						<div className="flex grow flex-row items-center gap-2">
							<CodeBlockFilename value={currentData.language}>
								{filename || currentData.filename}
							</CodeBlockFilename>
						</div>
						<CodeBlockCopyButton
							onCopy={() =>
								toast.success('Code copié avec succès !', {
									description: 'Utilisez le dans votre projet !',
								})
							}
							onError={() =>
								toast.error('Une erreur est survenue !', {
									description: 'Réessayer plus tard ...',
								})
							}
						/>
					</CodeBlockHeader>
					<div>
						<CodeBlockItem value={currentData.language} lineNumbers={lineNumbers}>
							<CodeBlockContent
								language={currentData.language as BundledLanguage}
								syntaxHighlighting={true}
							>
								{currentData.code}
							</CodeBlockContent>
						</CodeBlockItem>
					</div>
				</KiboCodeBlock>
			</div>
		);
	},
);
