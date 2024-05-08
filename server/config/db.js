const mongoose = require('mongoose');

const URI = `mongodb://localhost:27017/mydata`; // Utilisation de "mongodb" au lieu de "host" et ajout du nom de la base de données

mongoose.connect(URI,)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Obtenir la connexion active à la base de données
const db = mongoose.connection;

// Gestion des événements de connexion
db.on('connected', () => {
  console.log('Connexion à la base de données établie');
});

db.on('error', (err) => {
  console.error(`Erreur de connexion à la base de données : ${err.message}`);
});

db.on('disconnected', () => {
  console.log('Déconnexion de la base de données');
});

// Exporter la connexion active
module.exports = db;
