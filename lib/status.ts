export const dictionary = {
	operational: {
		label: 'Opérationnel',
		color: 'dark:bg-green-300 bg-green-600',
	},
	degraded_performance: {
		label: 'Dégradé',
		color: 'dark:bg-yellow-300 bg-yellow-600',
	},
	partial_outage: {
		label: 'Partiel',
		color: 'dark:bg-yellow-300 dark:bg-yellow-600',
	},
	major_outage: {
		label: 'Indisponible',
		color: 'dark:bg-red-300 dark:bg-red-600',
	},
	unknown: {
		label: 'Inconnu',
		color: 'dark:bg-gray-300 dark:bg-gray-600',
	},
	incident: {
		label: 'Incident',
		color: 'dark:bg-yellow-300 dark:bg-yellow-600',
	},
	under_maintenance: {
		label: 'Maintenance',
		color: 'dark:bg-blue-300 dark:bg-blue-600',
	},
} as const;
