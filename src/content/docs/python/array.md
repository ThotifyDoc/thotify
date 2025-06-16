---
layout: ../../../layouts/BaseLayout.astro
title: Comprendre les différentes structure de tableaux en Python
description: Guide pour les commandes de bases demandées en Prépa pour la semaine d'introduction au Shell et à Linux
---
## NumPy array (pas natif)

Lorsque l'on parle d'array en général on parle de **NumPy Array**. NumPy est une librairie codé en C pour une meilleure efficacité et gestion des tableaux. 
Les tableaux NumPy sont utilisés pour enregistrer des listes de data numériques représenté par des vecteurs, des matrices et même des tensors. NumPy a été conçu pour supporter un grosse masses de dataset de manière efficace.

**Initialisation : **
```python 
pip install numpy
import numpy as np

arr = np.array([1, 2, 3, 4]) # Créer un Numpy Array a partir d'une liste 
arr_zeros = np.zeros((3, 3)) # Créer un array de zéros (de taille 3x3 par exemple)
...

```
**Méthodes associées :**
```python 
sqrt, sin , append, insert, delete #... Voir cheatSheet
```

**Résumé des charactéristiques :**
- Idéal pour le calcul scientifique, le traitement d'images, et les applications d'apprentissage automatique.
- Permet des opérations vectorisées et des calculs sur des ensembles de données multidimensionnels.
- Fournit des outils puissants pour la manipulation de matrices et des fonctions mathématiques avancées.

[voir cheatSheet de NumPy](https://images.datacamp.com/image/upload/v1676302459/Marketing/Blog/Numpy_Cheat_Sheet.pdf)

## Module Array (pas natif) 
Les array natif en python n'existent pas, en général on parle de liste, mais il existe également une librairie permettrant l'utilisation de tableaux "classiques" 



**Initialisation :**
```python 
import array as arr

cars = [] #init si nécessaire
cars = ["Ford", "Volvo", "BMW"] 
```
**Méthodes associées :** 
```python
cars[0] = "Toyota" 
cars.append("Honda")
cars.pop(1) 
cars.remove("Volvo") 
```

**Résumé des charactéristiques :**
- Utilisé pour le stockage efficace de données de type uniforme (comme des nombres).
- Utile lorsque la performance est essentielle, notamment pour les grandes quantités de données.
- Moins courant que les listes pour les tâches générales en Python, mais utile pour les besoins spécifiques de traitement de données.


## List (natif)
En général lorsque l'on travail avec des données scientifiques on préfèrera travailler avec NumPy array qui possède des méthodes associé le rendant particulierement efficace. Dès lors que l'on sort du domaine scientifique les listes natives à python sont préférables voir conseillés vis à vis de l'utilisation de NumPy array. 

**Résumé des caractéristiques :**
- Les listes sont constitués de colonnes pouvant posséder chacune une a plusieurs lignes.
- On peut modifier n'importe quelle partie du tableau. 
- On peut avoir des éléments dupliqués. 

**Initialisation**
```python 
Exemple: [1, 2, 3, 4, 5]
```

**Exemple d'utilisation**
```python
Exemples: 
list.happend(x) # ajoute un élément à la fin de la liste
list.insert(i,x) # insert aux coordonnées
list.remove(x) # supprime le premier element rencontré égal à x
list.pop([i])
```
[voir plus](https://docs.python.org/fr/3/tutorial/datastructures.html) 
## Dictionaries (natif)

Les Dictionnaires sont semblables aux listes mais ils sont accédés de manière différentes. Ici on ne s'attarde pas sur l'index du tableau mais sur sa clé-valeur. On peut ordonné un dictionnaire avec des nombres mais l'intérêt reste limité.

**Initialisation:** 
```python 
{1: “a”, 2: “b”, 3: “c”, 4: “d”, 5: “e”}
```

**Méthodes associées** 
```python
dictionary.get(keyname, value)
dictionary.items()
dictionary.pop(keyname, defaultvalue)
dictionary.values() # return a tuples
...
```

**Résume des caractéristiques **
- Organisé en clé : valeur.
- On peut changer les valeurs mais pas les clés.
- On ne peut pas avoir de valeurs dupliquées.

[voir plus](https://www.w3schools.com/python/python_ref_dictionary.asp)

## Tuples  (natif)
Les tuples en Python sont des collections ordonnées et immuables, ce qui signifie que, contrairement aux listes, leurs éléments ne peuvent pas être modifiés après leur création. Ils peuvent contenir des éléments de différents types (entiers, chaînes, etc.), et permettent les doublons. Les tuples sont souvent utilisés pour stocker des données immuables ou passer des ensembles d'éléments groupés. Ils sont définis avec des parenthèses.

**Initialisation**
```python 
mon_tuples =  (1, 2, 3, 4, 5)
``` 

**Méthodes associées** 
```python 
tuple.count(value) # Return the number of times the value appears
tuple.index(value) # Search for the first occurrence of a value

```

**Résumé des caractéristiques :**
- Les tuples sont immutables
- Ils autorisent les duplicata 
- Idéal pour des valeurs constantes qui ne doivent pas être modifiées
- Utilisé comme clés dans des dictionnaires, car ils sont immuables (les clé des dictionnaires également).



## Ensemble (natif)

```python 
Exemple : 
set() #initialiser un ensemble vide
mon_ensemble = {1, 2, 3, 4} #initialiser un ensemble a partir de valeurs données
❌ a = {} # Créer un dictionnaire et non pas un ensemble

# Convertir une liste en un ensemble
ma_liste = [1, 2, 2, 3] 
mon_ensemble = set(ma_liste)  # Résultat: {1, 2, 3}

#CRUD
mon_ensemble.add(5)
mon_ensemble.remove(2)
mon_ensemble.discard(10)

## Ninja Style 
# Union d'ensembles
ensemble1 = {1, 2, 3}
ensemble2 = {3, 4, 5}
union_ensemble = ensemble1 | ensemble2  # Résultat: {1, 2, 3, 4, 5}

# Intersection d'ensembles
intersection_ensemble = ensemble1 & ensemble2  # Résultat: {3}

# Différence entre deux ensembles
difference_ensemble = ensemble1 - ensemble2  # Résultat: {1, 2}

# Vérifier l'appartenance 
3 in ensemble1  # Résultat: True

```

En résumé :
- Mutable 
- Utilisé pour éliminer les doublons dans une collection de données.
- Idéal pour les opérations ensemblistes, comme l'union, l'intersection et la différence.
- Vérification rapide de l'appartenance à un ensemble (très efficace pour cette opération).
- Stockage d'éléments uniques, comme les identifiants ou les mots-clés.
