module.exports = {
	content: ['./**/*.html'],
	theme: {
		container: {
			center: true,
		},
		extend: {
			colors: {
				brand: {
					DEFAULT: '#1030BC',
				},
			},
		},
	},
	variants: {},
	plugins: [require('@tailwindcss/typography')],
}
