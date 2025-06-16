---
title: Treejs
description: Les Shaders en ThreeJS
---

# Les Shaders

Les shaders sont les composants principaux de WebGL. C’est du WebGL natif et ça communique directement vers le GPU.
Le principe est de positionner et d’afficher chaque vertex d’une geometry dans un espace 2D

# Shaders : mémo

Pour créer ses propre shaders, on crée dans le dossier src du projet, un sous dossier “shaders”, puis un sous dossier pour le shader que l’on veut faire (ex. : firework)

**\*Ce sont des fichiers de type GLSL (OpenGL Shading Language)** Le langage n’est plus du js mais du glsl (ressemble au C)\*

> Extension VSCode pour la coloration : **Shader languages support for VS Code**

> Nécessite l’installation de cette librairie : https://www.npmjs.com/package/vite-plugin-glsl

Un shader est composé de 2 fichiers qui s’execute dans l’ordre :

- **VERTEX :** vertex.glsl : la position des vertex dans la geometry
  - Attributes : la position et tout ce qui change sur chaque vertex (position …)
  - Uniforms : Les data qui ne changent pas (mesh position …)
- **FRAGMENT** : fragment.glsl : la couleur, lights et données de textures de chaque vertex via :
  - Uniforms (color …)
  - Varying : Transmis du Vertex au Fragment

On l’importe ensuite en haut du script principal en js pour l’utiliser, puis on l’applique sur un shaderMaterial dans un objet de ce type :

```jsx
const material = new THREE.ShaderMaterial({
        vertexShader: fireworkVertexShader,
        fragmentShader: fireworkFragmentShader,
...
    })
```

# Vectors : rappel

- **Vector2 :** comprend 2 coordonnées comme x et y :

```jsx
vec2 foo = vec2(1.0, 2.0);
```

- **Vector3 :** comprend 3 coordonnées comme x, y, z mais aussi r,g,b pour une couleur par exemple:

```jsx
vec3 redColor= vec3(1.0, 0.0, 0.0);
```

- **Vector4 :** comprend a coordonnées comme x, y, z, w mais aussi r,g,b,a pour une couleur avec une couche alpha.

## GLSL : Méthode natives

Le GLSL possède des methodes natives mais de doc très intuitive.
Voici quelques methodes built-in classics :
**`sin`**, **`cos`**, **`max`**, **`min`**, **`pow`**, **`exp`**, **`mod`**, **`clamp`**

Et queques fonctions pratiques :
**`cross`**, **`dot`**, **`mix`**, **`step`**, **`smoothstep`**, **`length`**, **`distance`**, **`reflect`**, **`refract`**, **`normalize`**

# Créer un shader : à partir de, au choix

- ShaderMaterial : du code est automatiquement ajouté de base à ce shader
- RawShaderMaterial : On part from scratch

## RawShaderMaterial :

Doc : [https://threejs.org/docs/index.html#api/en/materials/RawShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/RawShaderMaterial)

```jsx
import testVertexShader from "./shaders/test/vertex.glsl";
import testFragmentShader from "./shaders/test/fragment.glsl";

const material = new THREE.RawShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
});
```

Propriétés gérées par RawShaderMaterial :

- Wireframe, Side, Transparent,FlatShading …
- Map, AlphaMap, OpacityColor …

## ShaderMaterial :

Doc : [https://threejs.org/docs/index.html#api/en/materials/RawShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial)

Contient des buitin uniforms et attributes et la précision est également automatiquement déterminée. On a rien besoin d’ajouter.

```jsx
const material = new THREE.ShaderMaterial({
    // ...
```

# Composition d’un Vertex Shader

- Une fonction **main()** qui ne retourne rien
- une **gl_position** (position des vertex sur l’écran, x,y,z et w (clip space necessitant un vec4)) dans laquelle on envoie :

  - Un **attribut** : attribute vec3 position;
  - Des **matrices uniformes** : uniform

  ```
  // Le ProjectionMatrix finalise les coordonnées finales du clip space
  uniform mat4 projectionMatrix;
  // viewMatrix : applique les transformations relatives à la CAMERA (position, rotation, fireld of view, near, far)
  uniform mat4 viewMatrix;
  // modelMatrix : fourni les les infos relatives au MESH (position, rotatio, scale)
  uniform mat4 modelMatrix;
  ```

  Pour appliquer les matrices on les multiplie :
  **`gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);`**
  On peut aussi séparer chaque partie afin d’avoir un contrôle sur chacune et les animer par exemple :

  ```glsl
  uniform mat4 projectionMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 modelMatrix;

  attribute vec3 position;

  void main()
  {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;

      gl_Position = projectedPosition;
  }
  ```

> A lire : https://learnopengl.com/Getting-started/Coordinate-Systems

# Composition d’un Fragment Shader

Un fragment c'est un peu comme un pixel. C’est une unité de ce qui compose l’objet qui utilise ce shader. Le code du fragment shader s’applique sur tous les éléments visibles du vertex shader, et donc après lui. Il est composé de :

- Une fonction **main()** qui ne retourne rien
- Une **précision** sur le type de float : généralement : precision mediump float
- Un **gl_FragColor**, comme le gl_position mais pour la couleur. C’est un vec4 r,g,b et a (Note : on peut aussi y assigner une texture avec la methode texture2D())
- Des **attributs** : ce qui change entre chaque vertex
  - “position” est un vec3 dispo pour une geometry
  - Mais on peut aussi créer ses propres attributs que l’on envoie directement dans le BufferAttribute , exemple : aRandom … on prefixe toujours par “a”
    **`geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))`**
  - Note : BufferAttribute(data array, number of attributes (exemple, 3 for a position…etc.)
- Les **Varying** : pour envoyer des data depuis le vertex shader vers le fragmet shader (on les prefixe avec “v” pour les différencier) ex. :

```glsl
varying float vRandom;

void main()
{
    // ...

    vRandom = aRandom;
}
```

- Les **Uniforms** : Envoi de data depuis le Javascript vers le shader. Exemple :

```jsx
const material = new THREE.ShaderMaterial({
  vertexShader: fireworkVertexShader,
  fragmentShader: fireworkFragmentShader,
  uniforms: {
    uSize: new THREE.Uniform(size),
    uResolution: new THREE.Uniform(sizes.resolution),
    uTexture: new THREE.Uniform(texture),
    uColor: new THREE.Uniform(color),
    uProgress: new THREE.Uniform(0),
  },
});
```

# Les Textures

On peut aussi appliquer une texture sur les fragments.

- Avant tout il faut charger cette texture dans un TextureLoader() dans le JS, exemple :

```jsx
const textureLoader = new THREE.TextureLoader();
const flagTexture = textureLoader.load("/textures/rainbow.jpg");
```

- On va ensuite la faire passer au shader via un Uniform (uTexture par exemple)

```jsx
const material = new THREE.RawShaderMaterial({
  // ...
  uniforms: {
    // ...
    uTexture: { value: flagTexture },
  },
});
```

- On va ensuite utiliser la methode texture2D(texture, coordonnées uv) pour placer la texture au bon endroit sur le fragment
  - Param 1 : la texture qu’on aura recup dans uTexture
  - Param 2 : l’attribut coordonnées uv qui viennent du vertex shader (fournis par eemple dans la planeGeometry : **`geometry.attributes.uv`**.
    Comme c’est un attribut, on le fait passer au fragment via un Varying et on peut l’utiliser

```glsl
varying vec2 vUv;

void main()
{
    vec4 textureColor = texture2D(uTexture, vUv);
    gl_FragColor = textureColor;
}
```

- Pour utiliser des variations de couleur sur une texture, on peu passer de multiples paramètres du vertex au fragment, comme par exemple l’elevation d’un vertex ou son mouvement, puis lui appliquer ensuite des variation de couleurs grâce à sa propriété rgb, exemple :

```glsl
void main()
{
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= vElevation * 2.0 + 0.5;
    gl_FragColor = textureColor;
}
```

# LIENS A EXPLORER :

Partage de shader et de code : https://www.shadertoy.com/
