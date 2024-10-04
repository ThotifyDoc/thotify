# 🌟 Thotify Documentation 🌟

Online : https://devendevorganization.github.io/thotify/

## Qu'est-ce que c'est ? 🤔

Astro Starlight Documentation est votre guichet unique pour toute la documentation sur le web. Que vous soyez un développeur chevronné ou un débutant curieux, notre application vous offre une expérience de documentation rapide, accessible et agréable.

## Pourquoi Astro Starlight ? 🌠

Astro Starlight combine la puissance et la performance d'Astro avec des outils de documentation de pointe. Vous pouvez étendre Starlight avec vos intégrations et bibliothèques Astro préférées, et utiliser Markdown, Markdoc, ou MDX pour créer votre contenu.

## Commencer 🛠️

- Clonez le dépôt :

```bash
git clone https://github.com/mangozmorgan/thotify.git
```

- Installez les dépendances : `npm install`
- Démarrer le serveur : `npm run dev`
- Rejoindre l'application : http://localhost:4322/thotify/
- Créer ta propre branche pour nous transmettre ton savoir

## Informations ressources 👀

Starlight recherche les fichiers **.md ou .mdx** dans le répertoire **src/content/docs/**. Chaque fichier est exposé comme une route basée sur son nom de fichier.

Les images peuvent être ajoutées dans **src/assets/** et intégrées dans le Markdown avec un lien relatif.

Les ressources statiques, comme les favicons, peuvent être placées dans le répertoire **public/**.

## Et quand j'ai fini ? 🐈‍⬛

- N'oublie pas de **signer** ta doc sinon ta pull request ne sera pas acceptée ! 🤙🤙 ( voir étape signature )
- ⚠️ **Pas besoin de build le projet**, c'est **github Action** qui va s'occuper de ça pour nous !
- Commit tes changements avec un message **court** et **précis**.
- **Push** tout ça, ensuite, rendez vous sur https://github.com/mangozmorgan/thotify/pulls pour créer ta **Pull Request** ( hé oui on fait ça comme des pros ! )
- Si ta PR est acceptée, elle sera **merge** dans la branche **main** et **push** en ligne !

## Signer ta doc ? 🤔

### Ajouter ta signature :

- Dans le fichier public/signatureData.ts rajoute tes informations sur le modèle de ce qui est défini
- Le fichier de signature dans le sous dossier de ta doc doit s'appeler **credentials.mdx** et doit suivre la même structure que tout les autres fichiers de ce type ( voir: \_src/assets/content/docs/minio/credentials.mdx )

## Tips & Tricks 🤫

- Quand tu va ajouter de nouveaux tutos, n'oublie pas d'utiliser **les badges** dans le fichier astro.config.mjs exemple :
  - `{ label: 'Introduction', slug: 'tests/level1/intro', badge: 'In progress' }`
