
const app = require('./app')
const { connectDb } = require('./src/config/db')
const PORT = process.env.PORT || 5000

// connectDb().then(() => {
//     app.listen(PORT, () => console.log(`Local Server running on port ${PORT}`));
// }).catch(err => console.log('DB connection failed:', err));



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})