const { getDB } = require("../config/db");
const sendResponse = require("../utlites/sendResponse");

exports.getUser = async (req, res) => {
    try {
        const Db = getDB();
        const email = req.query.email;
        const query = { email: email }
        const result = await Db.collection('usersCollection').findOne(query);
        sendResponse(res, result)
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message });
    }
}

exports.postUser = async (req, res) => {
    try {
        const user = req.body;
        const Db = getDB();
        const query = { email: user.email };
        const exitingUser = await Db.collection('usersCollection').findOne(query);
        if (exitingUser) {
            return res.send({status:"success", message: 'User already exiting on Database' })
        }
        const result = await Db.collection('usersCollection').insertOne(user);
        sendResponse(res,result);
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message });
    }
}
