
const app = require('./app')
const { connectDb } = require('./src/config/db')
const PORT = process.env.PORT || 5000

connectDb();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})