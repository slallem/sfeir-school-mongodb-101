<!-- .slide: class="transition underline"-->
# Scaling
## Replication et sharding

##--##

# Scaling vertical et horizontal

Avec le temps, la nécessité de scaler va se faire sentir pour répondre à différents besoin:

* \+ de performance en lecture
* \+ de performance en écriture
* \+ de proximité des données
* \+ performance pour des workloads analytics lourds
<!-- .element: class="list-fragment" -->

Notes:
- la localisation des données peut aussi être la conséquence des contraintes légales

##--##

# Les solutions classiques

* On booste les machines en CPU, RAM, disque, bande passante (verticale)
* On rajoute des machines (horizontal)
<!-- .element: class="list-fragment" -->
<br/><br/>
* Mais on ne peut pas booster des machines indéfiniment...
* Et cela ne résoud pas le problème de parallélisation de l'écriture ou de la proximité des données

Notes:
- Faire le // avec les CDNs
