'use client';

import type React from 'react';
import { useMemo } from 'react';
import {
	SandboxCodeEditor,
	SandboxConsole,
	SandboxPreview,
	SandboxProvider,
	SandboxTabs,
	SandboxTabsContent,
	SandboxTabsList,
	SandboxTabsTrigger,
} from '@/components/ui/Sandbox';

interface SandboxBlockProps {
	code: string;
}

export const SandboxBlock = ({ code }: SandboxBlockProps): React.JSX.Element => {
	const files = useMemo(
		() => ({
			'/index.js': code,
			'/helper.js': `// Auto-display helper (optimized)
if (typeof document !== 'undefined') {
	const originalLog = console.log;
	const outputs = [];
	let hasOutput = false;
	let isDestroyed = false;
	let updateTimeout = null;
	let checkCount = 0;
	const MAX_CHECKS = 15; // Reduced from 50
	
	console.log = (...args) => {
		originalLog(...args);
		if (isDestroyed) return;
		outputs.push(args.map(arg => 
			typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
		).join(' '));
		hasOutput = true;
		debouncedUpdate();
	};

	function debouncedUpdate() {
		if (updateTimeout) clearTimeout(updateTimeout);
		updateTimeout = setTimeout(updateOutput, 100);
	}

	function updateOutput() {
		if (isDestroyed) return;
		
		const outputDiv = document.getElementById('output');
		if (!outputDiv) return;
		
		let content = '';
		
		// Add console output if any
		if (outputs.length > 0) {
			content += \`<h3>📋 Console Output:</h3><pre style="background: #f8f9fa; padding: 10px; border-radius: 4px; overflow-x: auto; margin-bottom: 15px;">\${outputs.join('\\n')}</pre>\`;
		}
		
		// Optimized DOM content check - only if no console output and early checks
		if (!hasOutput && checkCount < 3) {
			const visibleContent = Array.from(document.body.children)
				.filter(el => !['SCRIPT', 'STYLE', 'META', 'TITLE', 'HEAD'].includes(el.tagName) && el.id !== 'output')
				.map(el => el.outerHTML)
				.join('');
			
			if (visibleContent?.trim()) {
				content += \`<h3>📄 Page Content:</h3><div style="background: #fff; padding: 10px; border: 1px solid #dee2e6; border-radius: 4px;">\${visibleContent}</div>\`;
			}
		}
		
		// Update the output div
		if (content) {
			outputDiv.innerHTML = content;
		} else if (!hasOutput && checkCount < 3) {
			outputDiv.innerHTML = \`<h3>🚀 Running JavaScript...</h3><p style="margin: 0; color: #6c757d;">Output will appear here</p>\`;
		}
	}

	// Optimized checking with exponential backoff
	function scheduleCheck() {
		if (isDestroyed || checkCount >= MAX_CHECKS) return;
		checkCount++;
		updateOutput();
		// Exponential backoff with max delay
		const delay = Math.min(100 * Math.pow(1.5, checkCount), 1000);
		setTimeout(scheduleCheck, delay);
	}

	// Initial run
	setTimeout(() => {
		if (!isDestroyed) {
			updateOutput();
			scheduleCheck();
		}
	}, 100);
	
	// Cleanup on page unload
	window.addEventListener('beforeunload', () => {
		isDestroyed = true;
		if (updateTimeout) clearTimeout(updateTimeout);
	});
}`,
			'/index.html': `<!DOCTYPE html>
<html>
<head>
	<title>Example en JavaScript</title>
	<style>
		body { 
			font-family: Arial, sans-serif; 
			padding: 20px; 
			background: #fff;
			margin: 0;
		}
		#output { 
			margin-top: 20px; 
			padding: 15px; 
			background: #f8f9fa; 
			border-radius: 6px; 
			border: 1px solid #dee2e6;
			min-height: 40px;
		}
		#output h3 {
			margin: 0 0 10px 0;
			color: #495057;
			font-size: 16px;
		}
		#output pre {
			margin: 0;
			font-family: 'Courier New', monospace;
			font-size: 14px;
			line-height: 1.4;
			color: #212529;
		}
		.demo-content {
			margin-top: 20px;
			padding: 15px;
			border: 1px solid #dee2e6;
			border-radius: 6px;
			background: white;
		}
	</style>
</head>
<body>
	<div id="output">
		<h3>Code JavaScript en cours de lancement 🚀</h3>
		<p style="margin: 0; color: #6c757d;">Voir le résultat dans la console</p>
	</div>
	<script src="helper.js"></script>
	<script src="index.js"></script>
</body>
</html>`,
		}),
		[code],
	);

	return (
		<div className="my-6">
			<SandboxProvider
				files={files}
				template="vanilla"
				options={{
					visibleFiles: ['/index.js'],
					activeFile: '/index.js',
				}}
			>
				<SandboxTabs defaultValue="code">
					<SandboxTabsList>
						<SandboxTabsTrigger value="code">code .js</SandboxTabsTrigger>
						<SandboxTabsTrigger value="preview">visualisation</SandboxTabsTrigger>
						<SandboxTabsTrigger value="console">console</SandboxTabsTrigger>
					</SandboxTabsList>
					<SandboxTabsContent value="code">
						<SandboxCodeEditor />
					</SandboxTabsContent>
					<SandboxTabsContent value="preview">
						<SandboxPreview />
					</SandboxTabsContent>
					<SandboxTabsContent value="console">
						<SandboxConsole />
					</SandboxTabsContent>
				</SandboxTabs>
			</SandboxProvider>
		</div>
	);
};
