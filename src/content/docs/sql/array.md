---
layout: ../../../layouts/BaseLayout.astro
title: CheatSheet révision SQL
description: Retracer les principales fonctionnalités des requêtes SQL
---

# SQL Cheatsheet – Révision Certification

## 📌 1. Structure de base d’une requête

```sql
SELECT colonne1, colonne2
FROM table
WHERE condition
ORDER BY colonne1 ASC | DESC;
```

Ordre logique d’exécution :

1. FROM
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. ORDER BY

---

## 2. Filtrage des données (WHERE)

```sql
WHERE colonne = valeur
WHERE colonne <> valeur
WHERE colonne > valeur
WHERE colonne BETWEEN v1 AND v2
WHERE colonne IN (v1, v2, v3)
WHERE colonne IS NULL
WHERE colonne IS NOT NULL
```

### LIKE (recherche de motifs)

```sql
WHERE nom LIKE 'A%'
WHERE email LIKE '%@gmail.com'
WHERE texte LIKE '%sql%'
```

---

## 3. Jointures

### INNER JOIN

```sql
SELECT *
FROM clients c
JOIN commandes o ON c.id = o.client_id;
```

### LEFT JOIN

```sql
SELECT *
FROM clients c
LEFT JOIN commandes o ON c.id = o.client_id;
```

### RIGHT JOIN

```sql
SELECT *
FROM clients c
RIGHT JOIN commandes o ON c.id = o.client_id;
```

### FULL OUTER JOIN

```sql
SELECT *
FROM tableA
FULL OUTER JOIN tableB ON condition;
```

---

## 4. Fonctions d’agrégation

```sql
COUNT(*)
SUM(colonne)
AVG(colonne)
MIN(colonne)
MAX(colonne)
```

### GROUP BY

```sql
SELECT pays, COUNT(*)
FROM clients
GROUP BY pays;
```

### HAVING (filtrer sur agrégats)

```sql
SELECT pays, COUNT(*)
FROM clients
GROUP BY pays
HAVING COUNT(*) > 10;
```

---

## 5. Sous-requêtes

### Dans WHERE

```sql
SELECT *
FROM employes
WHERE salaire > (
  SELECT AVG(salaire)
  FROM employes
);
```

### Avec IN

```sql
SELECT *
FROM commandes
WHERE client_id IN (
  SELECT id FROM clients WHERE pays = 'France'
);
```

---

## 6. Manipulation des données (DML)

### INSERT

```sql
INSERT INTO table (col1, col2)
VALUES (val1, val2);
```

### UPDATE

```sql
UPDATE table
SET colonne = valeur
WHERE condition;
```

### DELETE

```sql
DELETE FROM table
WHERE condition;
```

---

## 7. Création et structure des tables (DDL)

### CREATE TABLE

```sql
CREATE TABLE utilisateurs (
  id INT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  age INT CHECK (age >= 18)
);
```

### Contraintes

* PRIMARY KEY
* FOREIGN KEY
* UNIQUE
* NOT NULL
* CHECK

---

## 8. Vues

```sql
CREATE VIEW vue_clients_fr AS
SELECT *
FROM clients
WHERE pays = 'France';
```

---

## 9. Fonctions analytiques (selon SGBD)

### ROW_NUMBER

```sql
SELECT
  nom,
  ROW_NUMBER() OVER (ORDER BY salaire DESC) AS rang
FROM employes;
```

### RANK / DENSE_RANK

```sql
RANK() OVER (...)
DENSE_RANK() OVER (...)
```

---

## 10. Tri et limitation

```sql
ORDER BY colonne DESC
LIMIT 10
OFFSET 20
```

---

## 11. Bonnes pratiques pour l’examen

* Toujours vérifier les jointures (éviter les produits cartésiens)
* GROUP BY obligatoire pour toute colonne non agrégée
* HAVING ≠ WHERE
* Tester les requêtes avec LIMIT
* Lire attentivement les consignes (résultat attendu)

---

## 12. Erreurs fréquentes

- Utiliser HAVING sans GROUP BY
- Oublier la condition de jointure
- Confondre COUNT(*) et COUNT(colonne)
- Mettre une condition sur agrégat dans WHERE

---

## Résumé express

* SELECT → lire
* WHERE → filtrer lignes
* JOIN → relier tables
* GROUP BY → regrouper
* HAVING → filtrer groupes
* ORDER BY → trier

---


--- 
# Sources 
https://sql.sh/
https://www.w3schools.com/sql/