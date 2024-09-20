import type { Config } from 'tailwindcss';

const config = {
	darkMode: ['class'],
	content: {
		files: [
			'./app/**/*.{ts,tsx,mdx}',

			'./components/**/*.{ts,tsx}',
			'./config/**/*.{ts,tsx}',
			'./content/**/*.{md,mdx}',
			'./lib/**/*.{ts,tsx}',
			'./styles/**/*.{ts,tsx}',
			'./themes/**/*.{ts,tsx}',
			'./node_modules/@openstatus/react/**/*.{js,ts,jsx,tsx}',
		],
	},
	theme: {
		extend: {
			colors: {
				theme: 'var(--theme)',
				switch: 'var(--switch)',
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				border: 'var(--border)',
				divide: 'var(--divide)',
				input: 'var(--input)',
				primary: {
					DEFAULT: 'var(--primary)',
					foreground: 'var(--primary-foreground)',
				},
				secondary: {
					DEFAULT: 'var(--secondary)',
					foreground: 'var(--secondary-foreground)',
				},
				destructive: {
					DEFAULT: 'var(--destructive)',
					foreground: 'var(--destructive-foreground)',
				},
				muted: {
					DEFAULT: 'var(--muted)',
					foreground: 'var(--muted-foreground)',
				},
				accent: {
					DEFAULT: 'var(--accent)',
					foreground: 'var(--accent-foreground)',
				},
				ts: '#3178C6',
				js: '#F0DB4F',
				react: '#00D8FF',
				next: '#737373',
				html: '#EF652A',
				css: '#30A9DC',
				tailwind: '#0ED7B5',
				flowbite: '#1C64F2',
				framer: '#F648A7',
				express: '#A3A3A3',
				shell: '#3AB14A',
				fastify: '#A4A4A4',
				nestjs: '#E0234E',
				mdx: '#F9AC00',
				scss: '#CF649A',
				pug: '#EFCCA3',
				bun: '#FBF0DF',
				node: '#6CC04A',
				vue: '#41B883',
				vuetify: '#B0DEFF',
				mongo: '#07EB65',
				linkedin: '#0077B5',
			},
			maxWidth: {
				'43': '43rem',
				'20.5': '20.5rem',
			},
			maxHeight: {
				'18': '18rem',
				'20.5': '20.5rem',
			},
			boxShadow: {
				light: '3px 3px 0px 0px #000000',
				dark: '3px 3px 0px 0px #FFFFFF',
			},
			translate: {
				boxShadowX: '3px',
				boxShadowY: '3px',
				reverseBoxShadowX: '-3px',
				reverseBoxShadowY: '-3px',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			scale: {
				flip: '-1',
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'collapsible-down': 'collapsible-down 0.2s ease-out',
				'collapsible-up': 'collapsible-up 0.2s ease-out',
				'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
				'meteor-effect': 'meteor 5s linear infinite',
				'spin-slower': 'spin 6s linear infinite',
				'fade-in': 'fade-in 1s ease-out forwards',
				'fade-in-right': 'fade-in-right 1s ease-out forwards',
				'fade-in-left': 'fade-in-left 1s ease-out forwards',
				'fade-in-up': 'fade-in-up 1s ease-out forwards',
				'fade-in-down': 'fade-in-down 1s ease-out forwards',
				'logo-cloud': 'logo-cloud 18s linear infinite',
				'shimmer-effect': 'shimmer 8s infinite',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0',
					},
					to: {
						height: 'var(--radix-accordion-content-height)',
					},
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)',
					},
					to: {
						height: '0',
					},
				},
				'collapsible-down': {
					from: {
						height: '0',
					},
					to: {
						height: 'var(--radix-collapsible-content-height)',
					},
				},
				'collapsible-up': {
					from: {
						height: 'var(--radix-collapsible-content-height)',
					},
					to: {
						height: '0',
					},
				},
				'border-beam': {
					'100%': {
						'offset-distance': '100%',
					},
				},
				meteor: {
					'0%': {
						transform: 'rotate(215deg) translateX(0)',
						opacity: '1',
					},
					'70%': {
						opacity: '1',
					},
					'100%': {
						transform: 'rotate(215deg) translateX(-500px)',
						opacity: '0',
					},
				},
				'fade-in': {
					'0%': {
						opacity: '0',
					},
					'100%': {
						opacity: '1',
					},
				},
				'fade-in-left': {
					'0%': {
						opacity: '0',
						transform: 'translateX(var(--fade-in-left-tx, 1rem))',
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)',
					},
				},
				'fade-in-right': {
					'0%': {
						opacity: '0',
						transform: 'translateX(var(--fade-in-right-tx, -1rem))',
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)',
					},
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(var(--fade-in-up-ty, 1rem))',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				'fade-in-down': {
					'0%': {
						opacity: '0',
						transform: 'translateY(var(--fade-in-down-ty, -1rem))',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				'logo-cloud': {
					from: {
						transform: 'translateX(0)',
					},
					to: {
						transform: 'translateX(calc(-100% - 1.805rem))',
					},
				},
				shimmer: {
					'0%, 90%, 100%': {
						'background-position': 'calc(-100% - var(--shimmer-width)) 0',
					},
					'30%, 60%': {
						'background-position': 'calc(100% + var(--shimmer-width)) 0',
					},
				},
			},
			transitionTimingFunction: {
				slow: 'cubic-bezier(.405, 0, .025, 1)',
			},
			transitionDuration: {
				mid: '4s',
			},
		},
		fontFamily: {
			'geist-sans': ['var(--font-geist-sans)'],
			'geist-mono': ['var(--font-geist-mono)'],
		},
	},
	plugins: [require('@tailwindcss/typography')],
} satisfies Config;

export default config;
