# 🏰 Il faut sauver Gronnella

**Il faut sauver Gronnella** est un jeu de rôle léger, développé avec React, dans lequel vous incarnez un héros débutant face à une série de créatures absurdes et de situations décalées. Votre objectif : retrouver la princesse Gronnella, perdue quelque part entre les égouts du château et la tour d’un dragon mélomane.

---

## 🎮 Démarrage du jeu

Pour commencer votre aventure, ouvrez le projet dans votre navigateur en local après avoir installé les dépendances et lancé l’environnement de développement.

```bash
npm install
npm run dev
```

---

## 🧝‍♂️ Personnages jouables

Chaque personnage possède ses propres statistiques, ainsi qu’un éventuel sort magique :

- **Bravhilde Briseflamme** – Guerrière Humaine puissante et résistante.
- **Archibald Fumebarbe** – Magicien Humain spécialisé dans la boule de feu.
- **Lunéria Pluie-d’Argent** – Rôdeuse Elfe rapide, maniant l’arc et la foudre.
- **Snargle Fignetteur** – Gnome Voleur, expert en poisons et en fuites tactiques.

---

## 🧟 Ennemis à affronter

Durant votre périple, vous rencontrerez plusieurs types de créatures, chacune avec ses forces et faiblesses :

- **Rat Géant** – Faible, mais souvent en groupe.
- **Gobelin Lourd** – Plus coriace, mais peu subtil.
- **Minotaure** – Force brute, peu d’amis.
- **Dragon Vert** – Barde à ses heures perdues, mais redoutable en combat.

Les ennemis ont été équilibrés pour infliger des dégâts significatifs, même aux plus défensifs.

---

## ⚔️ Fonctionnement du combat

- Système au **tour par tour**.
- Vous pouvez **attaquer**, **lancer un sort**, **utiliser un objet** ou **tenter de fuir**.
- Les coups critiques (sur un jet de dé élevé) **doublent les dégâts**.
- Les ennemis peuvent **riposter** lorsqu’ils survivent à votre attaque.
- Le **journal de combat** vous permet de suivre chaque action dans le détail.

---

## 🎒 Gestion de l’inventaire

Vous avez accès à votre inventaire durant les combats pour utiliser vos objets, tels que des potions de soin ou de magie. Chaque objet a un effet immédiat.

---

## 📘 Progression et quêtes

Le jeu se compose d’une série de quêtes, chacune liée à un combat spécifique. Une fois une quête terminée, la suivante se débloque automatiquement. La dernière vous mènera au repaire du dragon et, peut-être, à la fin de votre aventure.

---

## 🛠 Contenu du projet

- Les **composants React** sont situés dans le dossier `components`.
- Les données du jeu (quêtes, personnages, ennemis) sont regroupées dans `data`.
- Chaque page (combat, défaite, victoire) est une **page React** à part entière.
- Le jeu utilise le **stockage local (localStorage)** pour sauvegarder la progression.

---

## 🎯 Pistes d’amélioration

- Développement d'une API pour stocker les données du jeu
- Jeu multi-utilisateurs, voire multi-joueurs
- Ajout de butin aléatoire après les combats.
- Mise en place d’effets temporaires (bonus, malus).
- Système de combat interactif.
- Système de dialogue interactif.
- Rééquilibrage dynamique de la difficulté.
- Bonus de fin alternatifs (objets rares, réputation, options de rejouabilité).

---

## 👨‍💻 Technologies utilisées

Ce jeu a été développé avec :

- **React** pour la structure de l’application.
- **SCSS** pour la mise en forme.
- **LocalStorage** pour le suivi de l’aventure.
- Aucune base de données ni backend.

---

## 📢 Remerciements

Ce projet a été conçu pour allier humour, nostalgie des RPG et plaisir de coder un jeu narratif accessible. Merci de prêter main forte à la cause de Gronnella. Elle a bien besoin de vous (et surtout d’un bain).

---

## 🏁 Bonne aventure

> « Vous avez vaincu un dragon… mais pas votre odeur. Revenez vite. » – Gronnella
