// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://github.com/ThotifyDoc/thotify',
	base: '/thotify/',  // Nom du repository GitHub
	integrations: [
		starlight({
			title: 'Thotify',
			customCss: [
				'./src/assets/style/style.css',
			  ],
			social: {
				github: 'https://github.com/ThotifyDoc/thotify',
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
				},{
					label: 'Minio Client',
					items: [
						// Each item here is one entry in the navigation menu.
						{ 
							label: 'Introduction',
							slug: 'minio/getstarted',
							
						}
						,{ 
							label: 'Cheat Sheet',
							slug: 'minio/cheatsheet',
						},
						{ 
							label: 'Crédits',
							slug: 'minio/credentials',
						},
					]
					,
					badge: {
						text: 'Nouveau',
						class: 'badge-new'
					},
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
				// {
				// 	label: 'Treejs',
				// 	items: [
				// 		{ 
				// 			label: 'Introduction',
				// 			slug: 'Treejs/demo',
				// 			badge: {
				// 				text: 'In progress',
				// 				class: 'badge-in-progress' 
				// 			},
				// 		},
				// 	]
				// 	,
				// },
			],
		}),
	],
});
