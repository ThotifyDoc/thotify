---
layout: ../../../layouts/BaseLayout.astro
title: JAVA Get Started
description: A guide in JAVA
---
<img src="/thotify/logos_officials/java.png" alt="JAVA official logo " title="Cycle de vie DS" style="width: 300px;">


## 📦 Prérequis

Assurez-vous d’avoir les outils suivants installés :

- [Java JDK 17+](https://adoptium.net/)
- [Maven](https://maven.apache.org/) (ou Gradle si tu préfères)

---

## ⚙️ Installation de l’environnement

### 1. Cloner le dépôt

```bash
git clone https://github.com/ton-username/nom-du-projet-java.git
cd nom-du-projet-java
```

### 2. Configurer les fichiers si nécessaire
Si votre projet utilise des fichiers de configuration personnalisés (ex: .env, .properties, etc.), créez-les à partir d'un modèle :

```bash
	cp config.sample.properties config.properties
```

### 3. Compilation du projet
Avec Maven
```bash
mvn clean compile
```
Pour générer un **.jar** :

```bash
mvn package
```

### 🚀 Exécution du projet

Après compilation, lancer le projet avec la commande suivante :

```bash
java -cp target/nom-du-projet-java-1.0-SNAPSHOT.jar com.exemple.Main
```
### 🧪 Lancer les tests
Si des tests unitaires existent :

```bash
mvn test
```
### 📁 Structure typique

```bash
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── exemple/
│   │           └── Main.java
│   └── resources/
└── test/
    └── java/
        └── com/
            └── exemple/
                └── MainTest.java
```
### 🐿️ Tips & astuces
Ajouter des flags à java pour l'affichage des logs ou du debugging :
```bash
java -Ddebug=true -cp ...
```

### 💡Extensions 

Dans le Marketplace VsCode :

- ✅ [Extension Pack for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
- ✅ [Language Support for Java(TM) by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)
- ✅ [Debugger for Java](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)