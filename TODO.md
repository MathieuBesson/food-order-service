# TODO list

## Back-end

-   [x] Ajout d'une collection qui stock les commandes de plats
-   [x] Ajout d'un champs calculé sur le GET des plats
-   [x] Renommer les controllers avec XXXController
-   [x] Ajout d'une vérification en POST pour la disponibilité
-   [x] Un README qui tue
-   [x] Au moment du POST sur Order => diminuer les quantités disponibles
-   [x] Implémenter la fonction getAllWithDisponibilities pour Dish
-   [x] Vérifier sur le @Type fonctionne (si oui le mettre partout)
-   [x] Réorganiser les models
-   [x] Renommer les models avec xxxRepository
-   [x] Renommer modelMongo en schema
-   [x] Revoir le système de routes
-   [x] Ajouter une route liste de aliments par type
-   [x] Ajouter une route liste de plats par type
-   [x] Ajouter un champ rôle sur User
-   [x] Sécuriser certaines routes par rôle (!== /order)
-   [x] Ajouter un lien vers une image sur les plats
-   [x] Ajouter le champ "transmitted" sur un order
-   [x] A la suppression d'une commande on libère les plats (si elle est pas "transmitted")
-   [x] Doc swagger
-   [x] Revoir les routes de tri dans dishs et foods pour coller à swagger
-   [x] Lié un order à un user ???
-   [X] Reprendre tous les attendus du new doc du prof
-   [ ] Pas de donnée => retour objet vide

-   [ ] Créer les deux tables (dishType && foodType)
-   [ ] Revoir la stratégie d'envoi des erreurs API
-   [ ] La création de la base en dynamique (si non on créé)

Helpers :

https://github.com/typestack/class-validator/issues/198#issuecomment-406237526

## Front-end

Client (PUBLIC):

-   Afficher tous les plats (+ dispo / pas dispo) / type
-   Créer un compte pour commander

Client Auth => Authentifié Client :

-   Commander des plats (Clique sur le + = ajout au panier)
-   Clique sur le panier (Liste des plats du panier + cganger la quantité)
-   Simulation d'un écran de paiement + redirection vers la liste des plats

BO => Authentifié ADMIN :

-   Visualisation, Ajout, MAJ, suppression plat / aliment
