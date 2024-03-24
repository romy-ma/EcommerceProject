// Import des modules nécessaires
const express = require('express');
const authRoutes = require('./routes/authroutes')
const mongoose = require('mongoose');
const proRoutes = require('./routes/proroutes')


// Configuration de l'application Express
const app = express();
app.use(express.json());
// Connexion à la base de données MongoDB avec Mongoose
mongoose.connect('mongodb://localhost:27017/auth_demo');
const db = mongoose.connection;


app.use('/auth', authRoutes)
app.use('/pro', proRoutes)

app.use('/cart',cartRoutes)



// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
