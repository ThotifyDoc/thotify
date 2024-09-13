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
					label: 'Golang',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Introduction', slug: 'golang/intro', badge: 'In progress' },
					]
					,
				},
				{
					label: 'Javascript',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Introduction', slug: 'javascript/intro', badge: 'empty' },
					]
					,
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
