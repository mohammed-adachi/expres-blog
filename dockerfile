# Utilisez une image Node.js comme base
FROM node:21


# Définir le répertoire de travail dans le conteneur
WORKDIR /server/index

# Copier le package.json et le package-lock.json
COPY package*.json ./
RUN npm install --save-dev nodemon
# Installer les dépendances
RUN npm install

# Copier le reste des fichiers dans le conteneur
COPY . .
# Exposer le port sur lequel l'application s'exécute
EXPOSE 3000


# Commande pour démarrer l'application
CMD ["npx","nodemon","server/index.js"]
