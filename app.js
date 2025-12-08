const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");
const express = require('express');
const cors = require('cors')
require('dotenv').config();
const app = express();
const userRoutes = require('./src/routes/user.routes');
const aiRoutes = require('./src/routes/ai.routes')
const couresRoutes = require('./src/routes/coures.routes')
const instructorRoutes = require('./src/routes/instructor.routes')
const logger = require('./src/middilwares/Logger');
const cartRoutes = require('./src/routes/cart.routes')
const paymentRoutes = require('./src/routes/payment.routes');
const { connectDb } = require('./src/config/db');
// global middilwares

app.use(cors())
app.use(express.json())
app.use(logger)

connectDb()
// Routes
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/v1/user', userRoutes)
app.use('/v1/ai', aiRoutes)
app.use('/v1/coures', couresRoutes)
app.use('/v1/instructor', instructorRoutes)
app.use('/v1/carts',cartRoutes)
app.use('/v1/pay',paymentRoutes)

module.exports = app;