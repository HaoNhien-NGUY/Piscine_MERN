# Piscine MERN - Jour 4

Quatrième jour de la piscine d'introduction à la stack MERN.  
Création d'un site de blogs.

Côté serveur de ma première application Node.js / Express.js avec communication avec une base de donnée MongoDB.  

# Technologies

 - Node.js
 - Express.js
 - MongoDB
 - JSON Web Token
 - React.js

## Cahier des charges

- Création d'un espace membre.
- Chaque membre qui va s’inscrire aura son blog accessible à l’adresse suivante : http://localhost:4242/**<login\>** où **<login\>** est le nom du membre.
- Avec son propre blog, chaque membre doit avoir accès à un CRUD « billet ».
- Sur le blog des autres, chaque membre peut :
  - Voir tous les billets du blog (sur la page d’accueil http://localhost:4242/<login\>/)
  - Voir le détail de chaque billet (titre, contenu, et commentaires)
  - Créer des commentaires sur les billets.
- Il doit être possible pour chaque membre, sur chaque blog, de pouvoir répondre aux commentaires, et de pouvoir répondre aux réponses des commentaires, et cela sans limite de niveaux.
