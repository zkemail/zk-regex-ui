/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/routes/**/*.{svelte,js,ts}'],
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: ['light', 'dark']
	},
	darkMode: ['class', '[data-theme="dark"]']
};
