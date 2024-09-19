export const query: string = String.raw`
	query ($login: String!) {
        user(login: $login) {
            contributionsCollection {
		        contributionCalendar {
		            colors
		            totalContributions
		            months {
		                firstDay
		                name
		                totalWeeks
		            }
		            weeks {
		                contributionDays {
		                    color
		                    contributionCount
		                    date
		                }
		                firstDay
		            }
		        }
            }
        }
	}
`;
