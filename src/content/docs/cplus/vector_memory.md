---
layout: ../../../layouts/BaseLayout.astro
title: An Explication of memory management in vector/array
description: Memory on Array/Vector explained.
---

# Comparaison mémoire : `std::vector` vs `std::array` en C++

## Différences fondamentales

### `std::array`
- **Taille fixe** définie à la compilation
- Allocation sur la **pile (stack)** si déclaré localement
- Aucune allocation dynamique
- Mémoire utilisée = `taille × sizeof(élément)` + padding d'alignement

```cpp
std::array<int, 100> arr; // Exactement 100 int, ni plus ni moins
```

### `std::vector`
- **Taille dynamique** modifiable à l'exécution
- Contient 3 champs internes (typiquement 24 bytes sur 64-bit) :
  - `data` : pointeur vers le buffer (heap)
  - `size` : nombre d'éléments utilisés
  - `capacity` : nombre d'éléments allouables sans réallocation
- Allocation sur le **tas (heap)**
- La capacité peut être **supérieure à la taille** pour optimiser les ajouts

```cpp
std::vector<int> vec;
vec.reserve(100); // capacity = 100, size = 0
```

**Taille d'un `std::vector` vide** : environ **24 bytes** (3 × 8 bytes sur 64-bit)

## Stratégie d'allocation dynamique du `vector`

### Principe de réallocation amortie

1. **Vecteur vide** : `size() = 0`, `capacity() = 0`
2. **Premier `push_back`** : alloue capacité initiale (souvent 1, 2 ou 4 éléments selon l'implémentation)
3. **Quand `size() == capacity()`** :
   - Alloue nouveau buffer **2× plus grand** (ou 1,5× selon la lib)
   - Copie tous les éléments existants
   - Libère l'ancien buffer

### Exemple de croissance

```cpp
std::vector<int> v; // vide

v.push_back(1); // size=1, capacity=1
v.push_back(2); // size=2, capacity=2
v.push_back(3); // size=3, capacity=4 (réallocation)
v.push_back(4); // size=4, capacity=4
v.push_back(5); // size=5, capacity=8 (réallocation)
```

| push_back | size | capacity |
|-----------|------|----------|
| 1         | 1    | 1 ou 2   |
| 2         | 2    | 2 ou 4   |
| 3         | 3    | 4        |
| 4         | 4    | 4        |
| 5         | 5    | 8        |

### Pour 20 000 éléments

La capacité finale sera la puissance de 2 supérieure : **32 768**  
→ Mémoire excédentaire : `32 768 - 20 000 = 12 768` éléments préalloués mais inutilisés

## Optimisation avec `reserve()`

### Sans `reserve()`
```cpp
std::vector<int> v1;
for(int i = 0; i < 1000; ++i) 
    v1.push_back(i); 
// Plusieurs réallocations et copies
```

### Avec `reserve()`
```cpp
std::vector<int> v2;
v2.reserve(1000); // 1 seule allocation
for(int i = 0; i < 1000; ++i) 
    v2.push_back(i);
// Aucune réallocation
```

### Intérêt de `reserve()`
- **Évite les réallocations multiples**
- **Réduit les copies d'éléments**
- **Améliore les performances** (moins de fragmentation mémoire)
- **Complexité amortie** : O(1) par insertion garantie

## Comparaison récapitulative

| Critère              | `std::array`           | `std::vector`                    |
|----------------------|------------------------|----------------------------------|
| **Allocation**       | pile/stack             | tas/heap (buffer dynamique)      |
| **Taille**           | fixe (compilation)     | dynamique (runtime)              |
| **Overhead mémoire** | minimal                | 24 bytes + capacité excédentaire |
| **Réallocation**     | impossible             | automatique (2× ou 1,5×)         |
| **Performance**      | accès direct optimal   | légèrement plus lent             |
| **Usage**            | taille connue          | taille variable                  |

## Recommandations

- **`std::array`** : taille connue à la compilation, performance maximale
- **`std::vector`** : taille inconnue ou variable, avec `reserve()` si taille estimée connue
- **Coût amortissement** : même si réallocations coûteuses, coût moyen par insertion reste O(1)

## Vérification pratique

```cpp
#include <iostream>
#include <vector>
#include <array>

int main() {
    std::vector<int> v;
    std::array<int, 100> a;
    
    std::cout << "sizeof(vector vide): " << sizeof(v) << " bytes\n";
    std::cout << "sizeof(array<100>): " << sizeof(a) << " bytes\n";
    
    v.reserve(100);
    std::cout << "vector après reserve(100):\n";
    std::cout << "  size: " << v.size() << "\n";
    std::cout << "  capacity: " << v.capacity() << "\n";
}
```

**Sortie typique (64-bit)** :
```
sizeof(vector vide): 24 bytes
sizeof(array<100>): 400 bytes
vector après reserve(100):
  size: 0
  capacity: 100
```

---

**Note** : Les détails d'implémentation (facteur de croissance 2× vs 1,5×, capacité initiale) varient selon :
- La bibliothèque standard (libstdc++, libc++, MSVC STL)
- La version du compilateur
- Les optimisations activées