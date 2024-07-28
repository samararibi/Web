const express = require('express');
require('./config/db');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jobRoutes = require('./routes/jobRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const cors = require('cors');


const app = express();
// Middleware
app.use(bodyParser.json());
app.use(cors());
// Utilisation des routes
app.use('/api/candidates', candidateRoutes);
//Midleware pour les routes des emplois
app.use('/api/jobs', jobRoutes);

app.listen(3000, ()=>{
    console.log('server work');
})