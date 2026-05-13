const mongoose = require('mongoose');
const Utilisateur = require('../models/Utilisateur');

// Logique d'inscription
exports.register = async (req, res) => {
    try {
        const { nomUtilisateur, prenomUtilisateur, emailUtilisateur, passwordHash } = req.body;

        const userExists = await Utilisateur.findOne({ emailUtilisateur });
        if (userExists) {
            return res.status(400).json({ success: false, message: "Cet email est déjà utilisé." });
        }

        const nouvelUtilisateur = await Utilisateur.create({
            nomUtilisateur,
            prenomUtilisateur: prenomUtilisateur || "Utilisateur", 
            emailUtilisateur,
            passwordHash, 
            idPlan: new mongoose.Types.ObjectId(), 
            createdAt: new Date()
        });

        res.status(201).json({ 
            success: true, 
            message: "Utilisateur créé avec succès !",
            user: { id: nouvelUtilisateur._id, nom: nouvelUtilisateur.nomUtilisateur } 
        });

    } catch (error) {
        
        if (error.code === 121) {
            return res.status(400).json({ success: false, message: "Données invalides selon le schéma de la base." });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

// Logique de connexion
exports.login = async (req, res) => {
    try {
        const { emailUtilisateur, passwordHash } = req.body;

        // 1. Chercher l'utilisateur par son email
        const user = await Utilisateur.findOne({ emailUtilisateur });

        // 2. Si l'utilisateur n'existe pas
        if (!user) {
            return res.status(401).json({ success: false, message: "Identifiants incorrects." });
        }

        // 3. Vérifier le mot de passe (on compare en brut pour l'instant)
        if (user.passwordHash !== passwordHash) {
            return res.status(401).json({ success: false, message: "Identifiants incorrects." });
        }

        // 4. Succès
        res.status(200).json({ 
            success: true, 
            message: "Connexion réussie !",
            user: { id: user._id, nom: user.nomUtilisateur }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Récupérer les infos de l'utilisateur connecté
exports.getMe = async (req, res) => {
    try {
        // On récupère l'ID depuis les paramètres de l'URL
        const user = await Utilisateur.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé." });
        }

        // On renvoie les infos nécessaires (on ne renvoie pas le mot de passe !)
        res.status(200).json({
            success: true,
            user: {
                nom: user.nomUtilisateur,
                prenom: user.prenomUtilisateur,
                email: user.emailUtilisateur
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};