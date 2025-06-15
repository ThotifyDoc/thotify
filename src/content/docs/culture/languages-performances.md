---
layout: ../../../layouts/BaseLayout.astro
title: Languages paradigms 
description: Quelles sont les différences ? 
---

# Table 4: Normalized Global Results for Energy, Time, and Memory
Parmi les 28 langages pris en compte dans le CLBG, les chercheurs ont exclu Smalltalk, car le compilateur de ce langage est propriétaire. De plus, pour des raisons de comparabilité, ils ont écarté les problèmes qui avaient une couverture de langages inférieure à 80 %. La couverture de langages d'un problème est le pourcentage de langages de programmation (sur les 27) dans lesquels des solutions sont disponibles pour ce problème. La définition de ce critère a permis d'exclure trois problèmes de l'étude.

Pour chacun des 10 problèmes restants, les chercheurs ont ensuite retenu la version de code source la plus efficace (c’est-à-dire la plus rapide), pour les 27 langages de programmation considérés. La documentation du CLBG fournit également des informations sur la version spécifique du compilateur/runner utilisée pour chaque langage, ainsi que sur les options de compilation/exécution considérées. Les chercheurs disent avoir « strictement suivi ces instructions », qu'ils ont installé les versions correctes de compilateur et se sont également assurés que chaque solution était compilée/exécutée avec les mêmes options que celles utilisées dans le CLBG.

Ils ont aussi testé chaque solution retenue pour s'assurer qu'ils pouvaient les exécuter sans erreurs et que le résultat obtenu était celui attendu. L'étape suivante consistait à recueillir des informations sur la consommation d'énergie, le temps d'exécution et l'utilisation maximale de la mémoire pour chacune des solutions compilables et exécutables dans chaque langage.

Il est à noter que le CLBG contient déjà des informations mesurées à la fois sur le temps d'exécution et l'utilisation maximale de la mémoire. Les chercheurs ont mesuré les deux, non seulement pour vérifier la cohérence de leurs résultats par rapport à ceux du CLBG, mais également parce que des spécifications matérielles différentes produiraient des résultats différents.

Pour mesurer la consommation d'énergie, ils ont utilisé l'outil RAPL (Running Average Power Limit) d'Intel, capable de fournir des estimations d'énergie très précises, comme cela a déjà été prouvé dans certaines études. A 10 reprises, chaque solution a été exécutée et les performances associées mesurées « afin de réduire l’impact des démarrages à froid et des effets du cache, d’analyser la cohérence des mesures et d’éviter les valeurs aberrantes ». Et ils rapportent que « les résultats mesurés sont assez cohérents ». Pour plus de cohérence, tous les tests ont été réalisés sur un ordinateur de bureau exécutant Linux Ubuntu Server 16.10, avec 16 Go de RAM et un processeur Intel Core i5-4460 cadencé à 3.20 GHz.

Après toutes ces précautions prises pour avoir des résultats pertinents, que révèlent les travaux des chercheurs ?

| **Energy** | **Time** | **Memory (Mb)** |
|------------|----------|-----------------|
| (c) C 1.00 | (c) C 1.00 | (c) Pascal 1.00 |
| (c) Rust 1.03 | (c) Rust 1.04 | (c) Go 1.05 |
| (c) C++ 1.34 | (c) C++ 1.56 | (c) C 1.17 |
| (c) Ada 1.70 | (c) Ada 1.85 | (c) Fortran 1.24 |
| (v) Java 1.98 | (v) Java 1.89 | (c) C++ 1.34 |
| (c) Pascal 2.14 | (c) Chapel 2.14 | (c) Ada 1.47 |
| (c) Chapel 2.18 | (c) Go 2.83 | (c) Rust 1.54 |
| (v) Lisp 2.27 | (c) Pascal 3.02 | (c) Lisp 1.92 |
| (c) OCaml 2.40 | (c) OCaml 3.09 | (c) Haskell 2.45 |
| (c) Fortran 2.52 | (v) C# 3.14 | (v) PHP 2.50 |
| (c) Swift 2.79 | (v) Lisp 3.40 | (c) Swift 2.71 |
| (c) Haskell 3.14 | (c) Haskell 3.55 | (v) Python 2.71 |
| (v) C# 3.23 | (c) Swift 4.20 | (c) OCaml 2.82 |
| (v) Dart 3.83 | (c) Fortran 4.40 | (v) C# 2.85 |
| (v) F# 4.13 | (v) F# 6.62 | (c) Hack 3.20 |
| (v) JavaScript 4.45 | (v) JavaScript 6.52 | (v) Racket 3.52 |
| (v) Racket 7.91 | (v) Dart 6.67 | (v) Ruby 4.01 |
| (v) TypeScript 21.50 | (v) Racket 11.27 | (c) Chapel 4.00 |
| (i) Hack 24.02 | (i) Hack 26.59 | (i) TypeScript 4.36 |
| (c) PHP 29.30 | (c) PHP 27.64 | (v) JavaScript 4.69 |
| (v) Erlang 42.23 | (v) Erlang 43.44 | (v) Java 4.95 |
| (i) Lua 45.98 | (i) Jruby 43.44 | (i) Perl 6.22 |
| (v) Jruby 69.91 | (v) TypeScript 46.20 | (v) Erlang 6.62 |
| (v) Python 75.88 | (v) Perl 65.79 | (v) Dart 8.94 |
| (i) Perl 79.58 | (v) Python 71.60 | (i) Jruby 19.84 |
| | (i) Lua 82.91 | |

https://programmation.developpez.com/actu/253829/Programmation-une-etude-revele-les-langages-les-plus-voraces-en-energie-Perl-Python-et-Ruby-en-tete-C-Rust-et-Cplusplus-les-langages-les-plus-verts/ 