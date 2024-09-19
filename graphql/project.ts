export const query: string = String.raw`
	query ($owner: String!, $repo: String!) {
		repository(owner: $owner, name: $repo) {
		    ref(qualifiedName: "main") {
		        target {
		            ... on Commit {
		                history(first: 0) {
		                    totalCount
		                }
		            }
		        }
		    }
	        languages(first: 10) {
	            totalSize
	            edges {
	                size
	                node {
	                    name
	                }
	            }
	        }
	    }
    }
`;
