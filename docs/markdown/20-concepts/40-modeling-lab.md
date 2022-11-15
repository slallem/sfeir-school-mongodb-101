<!-- .slide: class="transition underline"-->
# Exercice de Data Modeling

## Atelier collaboratif de modélisation

##--##

<!-- .slide: class="exercice" -->

# 1/ Catalogue produit basique
## Lab

* id interne, marque et nom du produit
* prix en EUR
* stock en cours
* statut en vente / pas en vente
* poids et dimension du carton
* ean (code-barre)
* date de création de la fiche 
* date de mise en vente

Notes:
- Timestamp du champ _id suffisant pour la création de la fiche ?

##--##

# 2/ En réalité, pas si basique...
## Lab
<!-- .slide: class="exercice" -->

* Nom du produit en français et en néerlandais
* Prix et stock différents en France et en Belgique
* Il y a des déclinaisons, donc plusieurs EANs pour un même produit
* La marque est en fait constituée d'un code et d'un libellé

Notes:
- Les produits sont plus complexes qu'il n'y parait car l'enseigne vend en France et en Belgique...
- Comment regrouper les données ?
  - ai-je besoin des prix de toutes les régions d'un coup ?
  - ai-je plutôt besoin de toutes les spécificités d'une région d'un coup ?
  - comment vais-je interroger la donnée ?
- 2 solutions : par champs puis pays ou par pays puis champs
- Distinguer la langue et la région : i18n vs locale


##--##
<!-- .slide: class="exercice" -->

# 3/ Disponibilité par magasin
## Lab

Il y a 90 magasins en France et en Belgique.

La liste de ces magasins est stockés dans la base dans une autre collection, avec toutes le détail nécessaire (*horaires, géolocalisation, le mot de bienvenue du directeur, url des images d'illustration pour le site, etc.*).

Les produits peuvent être vendus et en stock (ou pas) les magasins. Comment le modéliser ?


##--##
<!-- .slide: class="exercice" -->

# 4/ Hétérogénéité
## Lab

* Friteuses: avec/sans huile, volume, température maximale, matériaux, etc.
* Machine à laver: séchante oui/non, poids max du linge, nombre de programmes, etc
* Aspirateurs: avec ou sans sac, sans fil, nombre d'accessoires, etc.

En tout, il y a plus de *1700 caractéristiques différentes*.


Notes:
- Les produits sont variés et ont des caractéristiques différentes:
- Quelles solutions pour modéliser ceci dans les documents ?