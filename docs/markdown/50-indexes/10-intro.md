<!-- .slide: class="transition underline"-->
# Indexation

<!-- .slide-->
# Qu'est ce qu'un index
- Un index est une structure de données utilisée et entretenue par le système <br/><br/>
- Il permet:
    - Éviter un scan de collection
    - Localiser plus rapidement les documents
    - Améliorer la performance

##--##

<!-- .slide-->
# Comment se matérialise un index dans MongoDB
![full-center h-800](assets/images/mongodb/indexation-performance/index-structure.svg)

Notes:
 Ici on peut observer comment MongoDB organise son indexation, il crée des "documents" ne possédant que le champs indexé et sa valeur.
 Si dans notre query (qu'elle soit de type range, égalitaire ou juste trie) on ne spécifie pas l'index alors, MongoDB réalisera une résolution de query par collection scan (scan de tous les documents de la collection)

##--##

<!-- .slide-->
# Les différents types d'index
- Il existe plusieurs types d'index qui sont :<br/><br/>
    - Single field index
    - Compound index
    - Multikey index
    - Text index
    - Geospatial index
    - Hashed index
    - Wildcard index (MongoDB 4.2+)
    - Atlas Search index

##--##

<!-- .slide-->
# Les propriétés des indexes
- Les indexes peuvent posséder également des propriétés:<br/><br/>
    - Partial / Sparse<br/><br/>
    - Unique <br/><br/>
    - TTL
  
- Il ne peut y avoir que maximum 64 indexes par collection

Notes:
- Moins il y a d'indexes, moins il y d'écriture