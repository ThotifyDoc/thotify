// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';


export default defineConfig({
	site: 'https://mangozmorgan.github.io',
	base: '/thotify/', 
	
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
					label: 'Home',
					collapsed: true,
					items: [
						// Each item here is one entry in the navigation menu.
						{ 
							label: 'Sommaire',
							slug: 'home/summary',
							badge: {
								text: 'In progress',
								class: 'badge-in-progress'
							},
						 },
					]
					,
				},
				{
					label: 'Golang',
					collapsed: true,
					items: [
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
					collapsed: true,
					items: [
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
			],
		}),
	],
});
