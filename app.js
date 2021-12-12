const express= require('express');
const mongoose = require('mongoose');
const path= require('path');
const userRoutes= require('./routes/user');
const sauceRoutes= require('./routes/sauce');

const app= express();// on appelle la methode express, ce qui permet de creer une aplication express//

mongoose.connect('mongodb+srv://betsadmd:betsacl-149@cluster0.mqk3i.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json()); // cette methode nous donne accès au corps de la requete//

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);

app.use('/api/sauces', sauceRoutes);

module.exports = app; // on va exporter notre fichier pour pouvoir l'utiliser sur notre serveur//