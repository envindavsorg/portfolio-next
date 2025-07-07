export const query: string = String.raw`
	query ($username: String!) {
		user(login: $username) {
			login
			name
			avatarUrl
			followers {
				totalCount
			}
			following {
				totalCount
			}
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
			repositories(ownerAffiliations: OWNER, first: 100) {
                  totalCount
                  nodes {
                     stargazers {
                        totalCount
                     }
                  }
                  pageInfo {
                     hasNextPage
                     endCursor
                  }
               }
		}
	}
`;
