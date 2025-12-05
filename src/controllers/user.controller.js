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
