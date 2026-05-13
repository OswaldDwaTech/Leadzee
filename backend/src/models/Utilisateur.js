const mongoose = require('mongoose');

const UtilisateurSchema = new mongoose.Schema({
  nomUtilisateur: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
    maxlength: 100
  },
  prenomUtilisateur: {
    type: String,
    required: [true, 'Le prénom est obligatoire'],
    maxlength: 100
  },
  emailUtilisateur: {
    type: String,
    required: [true, "L'email est obligatoire"],
    unique: true, // Empêche les doublons au niveau applicatif
    match: [/.+\@.+\..+/, 'Veuillez entrer un email valide']
  },
  passwordHash: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire']
  },
  idPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'T_PLAN' // Crée un lien vers la collection des plans
  }
}, {
  timestamps: true // Crée automatiquement les champs createdAt et updatedAt
});

module.exports = mongoose.model('Utilisateur', UtilisateurSchema, 'T_UTILISATEUR');