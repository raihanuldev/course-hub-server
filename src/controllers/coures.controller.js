const { getDB } = require("../config/db");
const sendResponse = require("../utlites/sendResponse");


exports.getTopCoures = async (req, res) => {
    try {
        const db = getDB();
        const result = await db.collection('couresCollection').find().sort({ enrolled: -1 }).limit(6).toArray();
        console.log(result);
        sendResponse(res, result);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "error", message: err.message });
    }
}

exports.getAllCoures = async (req, res) => {
    try {
        const db = getDB();
        const result = await db.collection('couresCollection').find().toArray();
        sendResponse(res, result);
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message });
    }
}

exports.getAllApprovedCoures = async (req, res) => {
    try {
        const db= getDB();
        const apporvedCoures = await db.collection('couresCollection').find({ status: "approved" });
        const result = await apporvedCoures.toArray();
        sendResponse(res,result)
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message });
    }
}