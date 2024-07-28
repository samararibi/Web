const Job = require('../models/Job');
const Candidate = require('../models/candidate');


// Méthode pour créer une nouvelle offre d'emploi
exports.createJob = async (req, res) => {
  try {
    const { title, description, company, location, salary, requirements } = req.body;

    const newJob = new Job({
      title,
      description,
      company,
      location,
      salary,
      requirements
    });

    const savedJob = await newJob.save();
    res.status(201).json({ message: 'Offre d\'emploi créée avec succès.', job: savedJob });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'offre d\'emploi.', error });
  }
};

// Vous pouvez ajouter d'autres méthodes pour récupérer, mettre à jour et supprimer des offres d'emploi si nécessaire


// Méthode pour mettre à jour une offre d'emploi
exports.updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const updatedData = req.body;

    const updatedJob = await Job.findByIdAndUpdate(jobId, updatedData, { new: true });

    if (!updatedJob) {
      return res.status(404).json({ message: 'Offre d\'emploi non trouvée.' });
    }

    res.status(200).json({ message: 'Offre d\'emploi mise à jour avec succès.', job: updatedJob });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'offre d\'emploi.', error });
  }
};

// Méthode pour supprimer une offre d'emploi
exports.deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({ message: 'Offre d\'emploi non trouvée.' });
    }

    res.status(200).json({ message: 'Offre d\'emploi supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'offre d\'emploi.', error });
  }
};



// Méthode pour récupérer les offres d'emploi avec recherche et filtres
exports.getJobs = async (req, res) => {
  try {
    const { keyword, location, type } = req.query;

    const query = {};

    if (keyword) {
      query.$or = [
        { title: new RegExp(keyword, 'i') },
        { description: new RegExp(keyword, 'i') },
        { company: new RegExp(keyword, 'i') }
      ];
    }

    if (location) {
      query.location = new RegExp(location, 'i');
    }

    if (type) {
      query.type = type;
    }

    const jobs = await Job.find(query);

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des offres d\'emploi.', error });
  }
};


// Méthode pour récupérer les candidats pertinents pour une offre d'emploi spécifique
exports.getMatchingCandidates = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // Récupérer l'offre d'emploi spécifique
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Offre d\'emploi non trouvée.' });
    }

    // Extraire les mots-clés et compétences de l'offre d'emploi
    const { title, requirements } = job;

    // Rechercher les candidats correspondants aux mots-clés et compétences requis
    const candidates = await Candidate.find({
        $or: [
        { firstName: { $regex: title, $options: 'i' } }, // Recherche par le titre de l'offre
        { lastName: { $regex: title, $options: 'i' } },  // Recherche par le titre de l'offre
        { skills: { $in: requirements } }               // Recherche par les compétences requises
      ]
    });

    // Répondre avec les candidats trouvés
    res.status(200).json(candidates);
  } catch (error) {
    console.error('Erreur lors de la récupération des candidats correspondants :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des candidats correspondants.', error });
  }
};

exports.getMatchingCandidates = async (req, res) => {
    try {
      const jobId = req.params.jobId;
      console.log('ID de l\'offre d\'emploi:', jobId);
  
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: 'Offre d\'emploi non trouvée.' });
      }
  
      const { title, requirements } = job;
      const candidates = await Candidate.find({
        $or: [
          { firstName: new RegExp(title, 'i') },
          { lastName: new RegExp(title, 'i') },
          { skills: { $in: requirements } }
        ]
      });
  
      console.log('Candidats correspondants:', candidates);
      res.status(200).json(candidates);
    } catch (error) {
      console.error('Erreur lors de la récupération des candidats correspondants:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des candidats correspondants.', error });
    }
  };
