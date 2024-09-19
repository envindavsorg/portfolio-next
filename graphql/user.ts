export const query: string = String.raw`
	query ($login: String!) {
		user(login: $login) {
			login
			name
			avatarUrl
			followers {
				totalCount
			}
			following {
				totalCount
			}
		}
	}
`;
