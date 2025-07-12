import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';

const CACHE_DURATION = 60 * 60;

export const GET = async () => {
	try {
		const token = process.env.GITHUB_TOKEN;
		const username = process.env.GITHUB_USERNAME;

		if (!token || !username) {
			return NextResponse.json(
				{ error: 'GitHub credentials not configured' },
				{ status: 500 },
			);
		}

		const octokit = new Octokit({ auth: token });

		// Fetch user data and repositories
		const [userResponse, reposResponse] = await Promise.all([
			octokit.rest.users.getByUsername({ username }),
			octokit.rest.repos.listForUser({
				username,
				sort: 'updated',
				per_page: 100,
			}),
		]);

		const user = userResponse.data;
		const repos = reposResponse.data;

		// Calculate stats
		const totalStars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
		const totalForks = repos.reduce((acc, repo) => acc + (repo.forks_count || 0), 0);
		const publicRepos = user.public_repos;
		const followers = user.followers;

		// Get languages from repositories
		const languages: Record<string, number> = {};
		const languagePromises = repos
			.filter((repo) => !repo.fork && repo.language)
			.slice(0, 20) // Limit to avoid rate limits
			.map(async (repo) => {
				try {
					const langResponse = await octokit.rest.repos.listLanguages({
						owner: username,
						repo: repo.name,
					});
					return langResponse.data;
				} catch {
					return {};
				}
			});

		const languageResults = await Promise.all(languagePromises);

		languageResults.forEach((langData) => {
			Object.entries(langData).forEach(([lang, bytes]) => {
				languages[lang] = (languages[lang] || 0) + bytes;
			});
		});

		// Sort languages by usage
		const topLanguages = Object.entries(languages)
			.sort(([, a], [, b]) => b - a)
			.slice(0, 5)
			.map(([name, bytes]) => ({ name, bytes }));

		const stats = {
			publicRepos,
			totalStars,
			totalForks,
			followers,
			topLanguages,
			lastUpdated: new Date().toISOString(),
		};

		return NextResponse.json(stats, {
			headers: {
				'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
			},
		});
	} catch (error) {
		console.error('Error fetching GitHub stats:', error);
		return NextResponse.json({ error: 'Failed to fetch GitHub stats' }, { status: 500 });
	}
};
