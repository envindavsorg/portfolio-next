import { NextResponse } from 'next/server';
import { readFileSync, statSync } from 'fs';
import { join } from 'path';

export async function GET() {
	try {
		const pdfPath = join(process.cwd(), 'public', 'cv-cuzeac-florin.pdf');
		
		// Get file stats
		const stats = statSync(pdfPath);
		const sizeKB = Math.round(stats.size / 1024);
		const lastModified = stats.mtime.toLocaleDateString('fr-FR');

		// For page count, we'll need to analyze the PDF
		// This is a simple approach that counts PDF page objects
		let pages = 2; // Default fallback
		
		try {
			const pdfBuffer = readFileSync(pdfPath);
			const pdfText = pdfBuffer.toString('latin1');
			
			// Count PDF page objects - this is a simple heuristic
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
				error: 'Could not read PDF file' 
			},
			{ status: 500 }
		);
	}
}