// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://mangozmorgan.github.io',
	base: '/thotify/',  // Nom du repository GitHub
	integrations: [
		starlight({
			title: 'Thotify',
			social: {
				github: 'https://github.com/mangozmorgan/thotify',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
						{ label: 'Golang', slug: 'golang/golang' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
