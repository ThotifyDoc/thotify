---
layout: ../../../layouts/BaseLayout.astro
title: OpenCV Guide for C++ and MinGW64
description: A fun and easy guide to setting up OpenCV with C++ and MinGW64.
---
# Sur Windows
# 🎬 Ta propre version d'OpenCV !
---
## Pourquoi le faire ?
Les soucis de versions sous Windows peuvent vraiment devenir un casse-tête. Pourquoi ne pas prendre le contrôle et créer ta propre version d'OpenCV ? Cela pourrait résoudre ces problèmes et te donner plus de flexibilité dans tes projets !

## Comment faire ? 🎯

### Prérequis 🛠️
Avant de commencer, assure-toi d'avoir ces outils installés :
- **[CMake](https://cmake.org/download/)** (version 3.31.4, histoire de ne pas être à la traîne)
- **[MinGW64](https://packages.msys2.org/packages/mingw-w64-x86_64-gcc)** (version : mingw-w64-x86_64-gcc Version: 14.2.0-2) *(avoir **MYSYS** installé aide)*
- Télécharger le **code source d'OpenCV** (dans sa version ZIP) ici :  
  👉 [Github - OpenCV Release - Version 4.11.0](https://github.com/opencv/opencv/releases/tag/4.11.0)
- **Extraire** le dossier dans le disque **C:** de préférence

### Étapes de l'installation 🚀

#### 1. Installer les outils via **MinGW64** (MSYS2)
Ouvre ton terminal MSYS2 (MinGW64) et lance ces commandes pour tout préparer :
```bash
pacman -S mingw-w64-x86_64-toolchain
pacman -S mingw-w64-x86_64-cmake
```
#### 2. Préparer le terrain
Crée un dossier build dans le dossier extrait du ZIP d'OpenCV
Navigue dans ce dossier build :
```bash
cd C:\opencv-4.11.0\build
```
#### 3. Configurer le projet avec CMake
Dans le dossier build, lance la commande suivante pour préparer le projet pour MinGW64 :

```bash
cmake -G "MinGW Makefiles" ..
```
#### 4. Compiler OpenCV 🖥️
La compilation peut prendre un peu (beaucoup) de temps ! Pour lancer la compilation, tape :

```bash
mingw32-make
```
#### 5. Installer OpenCV 💻
Une fois la compilation terminée, tu es presque à la fin ! Installe OpenCV avec cette commande :

```bash
mingw32-make install
```
#### 6. Ajouter le dossier de dll au path 
Ajoute le chemin suivant dans tes variables d'environnement : 
- **C:\opencv-4.11.0\build\install\x64\mingw\bin**

🎉 Et voilà, tu as maintenant ta propre version d'OpenCV prête à être utilisée dans tes projets C++ !



# Sur Ubuntu

## Téléchargement de l'hyperviseur
- Virtual Box : https://www.virtualbox.org/wiki/Downloads

## Téléchargement de l'ISO
- Dernière version : https://ubuntu.com/download/desktop

## Installation de l'ISO
- https://ubuntu.com/tutorials/how-to-run-ubuntu-desktop-on-a-virtual-machine-using-virtualbox#1-overview

## Installation de VSCode
```bash
sudo apt-get install wget gpg
```

## Installation de CMake
```bash
  sudo apt-get -y install cmake
```

## Installation d'un compilateur C++
``` bash
sudo apt update && sudo apt install build-essential
```

## Installation d'OpenCV
```bash
  sudo apt update && sudo apt upgrade
  sudo apt install libopencv-dev python3-opencv
  dpkg -l libopencv-dev
```