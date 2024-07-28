const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');

// Route pour l'inscription
router.post('/register', candidateController.register);
// Route pour la connexion
router.post('/login', candidateController.login);
// Route pour récupérer le profil d'un candidat
router.get('/:id/profile', candidateController.getCandidateProfile);

// Route pour mettre à jour le profil d'un candidat
router.put('/:id/profile', candidateController.updateCandidateProfile);

// Route pour télécharger le CV d'un candidat
router.put('/:id/upload-cv', candidateController.uploadCV);
// Route pour récupérer tous les candidats
router.get('/', candidateController.getCandidates);

module.exports = router;

