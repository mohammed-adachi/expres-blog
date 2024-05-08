const express = require('express');
const app = express();

// Route GET pour récupérer la page
app.get('/api/users', (req, res) => {
    let page = req.query.page || 1;
    console.log(page);
    res.send(`Page demandée : ${page}`);
});

app.listen(3001, () => {
    console.log('Serveur Express démarré sur le port 3001');
});
