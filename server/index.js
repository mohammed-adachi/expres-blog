const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;
const connsctDb=require('./config/db')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'votre_secret_here', // Clé secrète pour signer la session
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ 
      mongoUrl: `mongodb://localhost:27017/mydata`, // URL de connexion à MongoDB
      // Intervalle en minutes pour vérifier et supprimer les sessions expirées (optionnel)
  }),
}));
// Configurer le moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Utiliser les layouts avec express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layouts/layout'); 

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/main'));
app.use('/', require('./routes/users'));
app.get('/', (req, res) => {
    if (connsctDb.readyState === 1) {
      res.send('Connexion à la base de données établie');
    } else {
      res.status(500).send('Erreur de connexion à la base de données');
    }
  });
  

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
});
