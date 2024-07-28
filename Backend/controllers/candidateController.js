const Candidate = require('../models/candidate');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Job = require('../models/Job');
// Inscription d'un candidat
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Vérifiez si l'email existe déjà
    const existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du candidat
    const newCandidate = new Candidate({
      name,
      email,
      password: hashedPassword,
    });

    await newCandidate.save();
    res.status(201).json({ message: 'Candidat enregistré avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};
// Connexion d'un candidat
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Trouver le candidat par email
      const candidate = await Candidate.findOne({ email });
      if (!candidate) {
        return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
      }
  
      // Vérifier le mot de passe
      const isMatch = await bcrypt.compare(password, candidate.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
      }
  
      // Générer un token JWT
      const token = jwt.sign({ id: candidate._id }, 'votre_clé_secrète', { expiresIn: '1h' });
  
      res.status(200).json({ message: 'Connexion réussie', token });
    } catch (error) {
      res.status(500).json({ message: 'Erreur du serveur' });
    }
  };
 
  // Méthode pour récupérer le profil d'un candidat
exports.getCandidateProfile = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidat non trouvé.' });
    }
    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du profil du candidat.', error });
  }
};

// Méthode pour mettre à jour le profil d'un candidat
exports.updateCandidateProfile = async (req, res) => {
  try {
    const { address, phoneNumber, experiences, skills } = req.body;

    const updatedCandidate = await Candidate.findByIdAndUpdate(req.params.id, {
      address,
      phoneNumber,
      experiences,
      skills
      // Ajoutez d'autres champs à mettre à jour selon vos besoins
    }, { new: true });

    if (!updatedCandidate) {
      return res.status(404).json({ message: 'Candidat non trouvé.' });
    }

    res.status(200).json({ message: 'Profil du candidat mis à jour.', candidate: updatedCandidate });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du profil du candidat.', error });
  }
};

// Méthode pour télécharger le CV d'un candidat
exports.uploadCV = async (req, res) => {
  try {
    const candidateId = req.params.id;
    const { cvUrl } = req.body;

    const updatedCandidate = await Candidate.findByIdAndUpdate(candidateId, { cvUrl }, { new: true });

    if (!updatedCandidate) {
      return res.status(404).json({ message: 'Candidat non trouvé.' });
    }

    res.status(200).json({ message: 'CV téléchargé avec succès.', candidate: updatedCandidate });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du téléchargement du CV.', error });
  }
};
// Méthode pour rechercher des candidats avec des critères spécifiques
exports.getCandidates = async (req, res) => {
  try {
    const { keyword, location, skills } = req.query;

    const query = {};

    if (keyword) {
      query.$or = [
        { firstName: new RegExp(keyword, 'i') },
        { lastName: new RegExp(keyword, 'i') },
        { email: new RegExp(keyword, 'i') },
        // Ajoutez d'autres champs pertinents ici pour la recherche
      ];
    }

    if (location) {
      query.location = new RegExp(location, 'i');
    }

    if (skills) {
      query.skills = { $in: skills.split(',') };
    }

    const candidates = await Candidate.find(query);

    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des candidats.', error });
  }
};