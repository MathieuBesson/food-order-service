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
-   [ ] Ajouter une route liste de aliments par type
-   [ ] Ajouter une route liste de plats par type
-   [ ] Ajouter un champ rôle sur UserRepository
-   [ ] Sécuriser certaines routes par rôle (!== /order)
-   [ ] Ajouter le champ "transmitted" sur un order
-   [ ] A la suppression d'une commande on libère les plats (si elle est pas "transmitted")
-   [ ] Ajouter un lien vers une image sur les plats
-   [ ] Revoir la stratéie d'envoi des erreurs API
-   [ ] Doc swagger
-   [ ] Reprendre tous les attendus du new doc du prof

-   [ ] La création de la base en dynamique (si non créé)
-   [ ] Revoir le système de routes

Helpers :

https://github.com/typestack/class-validator/issues/198#issuecomment-406237526

## Front-end

Client (PUBLIC):

-   Afficher tous les menus (+ dispo / pas dispo)
-   Créer un compte pour commander

Client Auth => Authentifié Client :

-   Commander des plats (Clique sur le + = ajout au panier)
-   Clique sur le panier (Liste des plats du panier + cganger la quantité)
-   Simulation d'un écran de paiement + redirection vers la liste des plats

BO => Authentifié ADMIN :

-   Visualisation, Ajout, MAJ, suppression plat / produit
