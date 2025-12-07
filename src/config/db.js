const { MongoClient } = require('mongodb')

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jvqibpv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

let db;
const connectDb = async () => {
    try {
        await client.connect();
        db = client.db(process.env.DB_NAME)
        console.log(`MongoDB Connected: ${process.env.DB_NAME}`);
    } catch (error) {
        console.error(`DB connection error: ${error}`);
        process.exit(1);
    }
};

const getDB = () => {
    if (!db) throw new Error("Database  Not initialized ");
    return db;
}

module.exports = { connectDb, getDB };
