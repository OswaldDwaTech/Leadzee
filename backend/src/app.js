require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path'); // Importé plus haut pour la clarté
const connectDB = require('./config/db');
const authRoutes = require('./routes/insroute'); 

const app = express();

// 1. Connexion DB
connectDB();

// 2. Middlewares
app.use(cors());
app.use(express.json());

// 3. Fichiers statiques (CSS, Images, JS du front)
// On pointe vers le dossier dashboard
app.use(express.static(path.join(__dirname, '../../dashboard')));

// 4. Routes API
app.use('/api/auth', authRoutes);

// 5. ROUTE PRINCIPALE (C'est ici que la magie opère)
app.get('/', (req, res) => {
    // Vérifie bien que ton fichier s'appelle connexion.html ou login.html
    res.sendFile(path.join(__dirname, '../../dashboard/connexion.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {

    console.log(` Serveur : http://localhost:${PORT}`);
    console.log(`
        Racine : ${path.join(__dirname, '../../dashboard')}`);
    console.log(`==========================================`);
});