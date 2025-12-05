const express = require('express');
const cors = require('cors')
require('dotenv').config();
const app = express();
const userRoutes = require('./src/routes/user.routes');
const logger = require('./src/middilwares/Logger');

// global middilwares

app.use(cors())
app.use(express.json())
app.use(logger)


// Routes
app.use('/v1/user', userRoutes)

module.exports = app;