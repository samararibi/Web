const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Route pour créer une nouvelle offre d'emploi
router.post('/', jobController.createJob);

// Vous pouvez ajouter d'autres routes pour récupérer, mettre à jour et supprimer des offres d'emploi si nécessaire

// Route pour mettre à jour une offre d'emploi
router.put('/:id', jobController.updateJob);

// Route pour supprimer une offre d'emploi
router.delete('/:id', jobController.deleteJob);


// Route pour récupérer les offres d'emploi avec recherche et filtres
router.get('/', jobController.getJobs);
// Route pour récupérer les candidats pertinents pour une offre d'emploi spécifique
router.get('/:jobId/candidates', jobController.getMatchingCandidates);



module.exports = router;