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
			customCss: [
				'./src/assets/style/style.css',
			  ],
			social: {
				github: 'https://github.com/mangozmorgan/thotify',
			},
			sidebar: [
				{
					label: 'Golang',
					items: [
						// Each item here is one entry in the navigation menu.
						{ 
							label: 'Introduction',
							slug: 'golang/intro',
							badge: {
								text: 'In progress',
								class: 'badge-in-progress' 
							},
						 },
					]
					,
				},
				{
					label: 'Exemple Structure',
					items: [
						
						{ 
							label: 'Level 1',
							badge: {
								text: 'exemple',
								class: 'badge-new' 
							},
							items: [
								{ label: 'Introduction', slug: 'tests/level1/intro' }

							]
						},
					]
				},
			],
		}),
	],
});
