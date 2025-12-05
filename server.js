const express = require('express');
const port = process.env.PORT || 5000;

const app = express();



// Routes
const userRoutes = require('./src/routes/user.routes');
const logger = require('./src/middilwares/Logger');

app.use(logger)
app.use('/v1/user',userRoutes)

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});