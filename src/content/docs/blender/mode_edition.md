---
layout: ../../../layouts/BaseLayout.astro
title: A Blender Guide
description: A guide for Blender
---

# Blender - Présentation du Mode Édition

Ce document présente des fonctionnalités essentielles du **mode Édition** de Blender. Chaque section décrit un outil ou une technique, avec son usage, son raccourci, et des remarques utiles.

---

## 🔹 Transformations de base

- **Déplacement** (`G`)
- **Rotation** (`R`)
- **Échelle** (`S`)
- Fonctionne sur **vertex**, **edge**, ou **face**
- Combinaison avec axes (`X`, `Y`, `Z`) possible
- **`G` + `G`** → glisser un vertex/arête sur la géométrie (slide)

---

## 🔹 Extrusion

- Raccourci : `E`
- Crée une nouvelle géométrie connectée
- Extrusion libre ou contrainte à un axe (`E`, `Z`, etc.)
- Attention aux extrusions involontaires (double E par erreur)

---

## 🔹 Snapping

- **Snapping** : `Shift + Tab` → active l'aimant
- Choix du type de snapping (vertex, edge, face…)

---

## 🔹 Fill

- **Remplissage (`F`)** : crée une face/edge entre les éléments sélectionnés
- **`Alt + F`** : remplissage intelligent de trous

---

## 🔹 Inset (Inset Faces)

- Raccourci : `I`
- Crée une face plus petite à l’intérieur d’une face existante
- Utilisé pour panneaux, détails, préparation d’extrusions
- Options : *Individual*, *Boundary*, *Offset Even*

---

## 🔹 Bevel

- Raccourci : `Ctrl + B`
- Arrondit les arêtes ou sommets sélectionnés
- Molette de souris : contrôle le nombre de segments
- Peut être combiné avec Subdivision Surface pour un rendu lisse

---

## 🔹 Loop Cut / Knife / Bisect

- **Loop Cut** (`Ctrl + R`) : ajoute une arête en boucle
- **Knife Tool** (`K`) : découpe libre de la géométrie
- **Bisect** : coupe un objet en deux, peut supprimer un côté

---

## 🔹 Poly Build

- Outil interactif pour **créer/étendre** de la géométrie à partir de faces
- Permet d'ajouter rapidement de la structure
- Très utile pour début de modélisation organique

---

## 🔹 Spin

- Permet de dupliquer une géométrie autour d’un point de rotation
- Utilisé pour objets circulaires, hélices, vis, colonnes, etc.
- Paramètres dans le menu bas-gauche après l’outil

---

## 🔹 Smoothing

- **Subdivision Surface Modifier** : lissage géométrique
- **Shade Smooth** : adoucit le rendu des faces sans changer la topologie
- **Edge Crease** (`Shift + E`) : rend les bords plus nets malgré la subdivision

---

## 🔹 Edge Slide / Shrink-Fatten / Shear

- **Edge Slide** : `G` + `G` → glisse le long de la géométrie
- **Shrink/Fatten** (`Alt + S`) : gonfle ou compresse le long des normales
- **Shear** : déforme en diagonale (utile pour les formes inclinées)

---

## 🔹 Rip / Merge

- **Rip (`V`)** : sépare les éléments connectés en ouvrant une cassure
- **Merge (`M`)** : fusionne plusieurs vertices (au centre, au curseur, etc.)
- ⚠ Peut causer des erreurs de topologie (trous, shading cassé)
- Recalcul des normales : `Shift + N`

---

## 🔹 Join (Object Mode) + Merge

- **Join (`Ctrl + J`)** : fusionne plusieurs objets en un seul (mode Objet)
- Ensuite, utiliser **Merge (`M`)** dans le mode Édition pour relier la géométrie
- Vérifier l’origine et les transformations appliquées

---

## 🔹 Dissolve

- **Dissolve (`X` → Dissolve)** : supprime sans casser la surface
- Préserve la géométrie globale mais simplifie le maillage
- Différent de "Delete" qui crée des trous

---

## 🔹 Bridge Edge Loops

- **Bridge Edge Loops** : connecte deux boucles d’arêtes par une géométrie
- Utile pour des tunnels, cylindres, raccords de pièces
- Nécessite deux boucles bien alignées

---

## 🔹 Proportional Editing

- Active/désactive : `O`
- Permet de modifier un point en affectant ceux autour selon une courbe
- Molette de la souris : ajuster l’influence
- Pratique pour des formes organiques (roches, visages...)

---

## 🔸 Autres Fonctions Utiles

- **Auto Merge** (en haut de l’écran → petite icône) : fusion automatique si vertices se touchent
- **Edge Crease (`Shift + E`)** : contrôle les bords nets avec subdivision
- **Symmetrize** : copie une moitié sur l’autre (X, Y, Z)
- **Grid Fill** : remplissage propre d’un trou polygonal
- **To Sphere (`Shift + Alt + S`)** : arrondir une sélection

---

## 📌 Rappels Généraux

- **Mode Wireframe (`Z`)** pour sélectionner à travers la géométrie
- **Face Orientation Overlay** : utile pour détecter les normales inversées
- **Origin Point** (point orange) affecte la transformation et la rotation

---

## 🎓 Conseils

- Testez chaque outil sur un **objet dédié**.
- Pensez à toujours **recalculer les normales** (`Shift + N`) après de grosses modifications, si vous faites aussi du shading.
- Utilisez le **menu contextuel** (`clic droit`) et **la barre F9** pour ajuster les outils après usage.

---