export const formatDate = (dateString: string) =>
	new Date(`${dateString}T00:00:00Z`).toLocaleDateString('fr-FR', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		timeZone: 'UTC',
	});
