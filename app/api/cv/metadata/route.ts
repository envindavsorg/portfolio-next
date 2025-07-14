import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { NextResponse } from 'next/server';

export const GET = async () => {
	try {
		const pdfPath = join(process.cwd(), 'public', 'cv-cuzeac-florin.pdf');

		const stats = statSync(pdfPath);
		const sizeKB = Math.round(stats.size / 1024);
		const lastModified = stats.mtime.toLocaleDateString('fr-FR');

		let pages = 1;

		try {
			const pdfBuffer = readFileSync(pdfPath);
			const pdfText = pdfBuffer.toString('latin1');
			const pageMatches = pdfText.match(/\/Type\s*\/Page[^s]/g);
			if (pageMatches) {
				pages = pageMatches.length;
			}
		} catch (error) {
			console.warn('Could not count PDF pages:', error);
		}

		return NextResponse.json({
			pages,
			sizeKB,
			lastModified,
		});
	} catch (error) {
		console.error('Error getting CV metadata:', error);
		return NextResponse.json(
			{
				pages: 2,
				sizeKB: 0,
				lastModified: new Date().toLocaleDateString('fr-FR'),
				error: 'Could not read PDF file',
			},
			{ status: 500 },
		);
	}
};
