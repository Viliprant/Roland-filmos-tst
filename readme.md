# Roland Filmos

Jeu...

## Mode de jeu :
- [x] Partie **privée** ( 10 personnes max)
- [x] Partie **publique** ( 2, 4, 6 personnes)

## Règles :
- **Un nom d'acteur est donné** par le jeu au premier joueur.
- Le premier joueur doit saisir le nom d'un acteur **ayant joué avec ce dernier**.
- Le joueur suivant doit saisir le nom d'un acteur ayant joué **avec le dernier acteur cité**, et *ainsi de suite ...*
- Le joueur qui **ne trouve plus d'acteur** ou qui **se trompe** est **éliminé** de la partie.
- **Le dernier joueur restant est le gagnant.**
- Les joueurs ont **15 secondes** pour saisir une réponse.
- Pour qu'une réponse soit valide, il faut rentrer **le nom et le prénom de l'acteur**.
- Les joueurs **ne peuvent pas répéter** un même nom d'acteur pendant **une même partie**.

## Règles techniques :
- [] Minimum **2 mots** *(nom prénom / prénom nom)*
- [] Afficher les **5 premiers acteurs** après le premier mot

## Scénario du site :
- **Page d'accueil :**
    - [] **Logo** du jeu
    - [x] Bouton **"Commencer une partie"**
    - [x] Bouton **"Rejoindre une partie"**
    - [x] Bouton **"Règles"** => affiche une **Popup**
- **Choix du type** de partie :
    - **Publique** :
        - [x] Combien de joueur à chercher *(2, 4, 6 personnes)*
    - **Privée** :
        - [x] **ID** de la partie
        - [x] **Joueurs présents** dans le salon

## TODO:
- [x] **Séparer** `SocketIO client` dans un fichier à part (factoriser)
- [x] **Créer** une partie privée
- [x] **Rejoindre** une partie `privée`
    - [x] Créer un channel
    - [x] Supprimer les personnes déconnectés du channel et de la partie
    - [x] Adapter l'interface web
- [x] **Vérifier** qui sont les destinataires des `events`
- [x] Elements imprévus
    - [x] Deconnexion User
    - [x] Retour accueil User
- [x] User events
    - [x] Vérifier la synchro USER
        - [x] A l'initialisation de la page
        - [x] Au changement de nom
        - [x] A la déconnexion

- [] **Lancer** une partie `privée`
    - [x] **Ajouter** le bouton `jouer`
    - [] **Verouiller** la partie
    - [] **Ajouter** les participants dans les `authorizedIDs`
    - [] **Créer** les pages de la partie
    - [] **Requêter** l'`API`
    - [] **Créer** l'algo du jeu :DD
        - **Déroulement** de la partie :
            - [] Afficher un **nom d'acteur aléatoire**
            - [] **L'ordre des joueur** est déterminé **aléatoirement**
            - [] **Phase** de jeu :
                - [] **Input** + **image** du précédent acteur
                - [] **Validation**
                - [] **Attente** de son tour    
                - [] **Perdu**
                - [] **Gagné**

- [] A la **fin** d'une partie
    - [] **Supprimer** le channel
    - [] **Supprimer** le game du service
- [] **Créer** une partie `publique`
- [] **Rejoindre** une partie `publique`