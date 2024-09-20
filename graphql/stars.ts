export const query: string = String.raw`
	query repositoryStars($owner: String!, $project: String!) {
        repository(owner: $owner, name: $project) {
            stargazers {
                totalCount
            }
            owner {
                login
                avatarUrl
            }
            name
        }
    }
`;
