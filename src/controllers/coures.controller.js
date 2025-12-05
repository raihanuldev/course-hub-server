const { getDB } = require("../config/db");
const sendResponse = require("../utlites/sendResponse");

exports.getTopCoures = async (req, res) => {
    try {
        const db = getDB();
        const result = await db.collection('couresCollection').find().sort({ enrolled: -1 }).limit(6).toArray();
        console.log(result);
        sendResponse(res,result);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "error", message: err.message });
    }
}