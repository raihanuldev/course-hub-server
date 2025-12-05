const { getDB } = require("../config/db");
const { ObjectId } = require('mongodb');
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
        const db = getDB();
        const apporvedCoures = await db.collection('couresCollection').find({ status: "approved" });
        const result = await apporvedCoures.toArray();
        sendResponse(res, result)
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message });
    }
}

exports.makeApprovalCoures = async (req, res) => {
    try {
        const id = req.params.id;
        const db = getDB();
        const _id = new ObjectId(id);
        const result = await db.collection('couresCollection').findOneAndUpdate(
            { _id: _id },
            {
                $set: { status: 'approved' },
                $inc: {
                    enrolled: 1,
                    availableSeats: -1,
                },
            }

        )
        sendResponse(res, result)
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message });

    }
}

exports.Feedback = async (req, res) => {
    try {
        const db = getDB();
        const _id = new ObjectId(req.params.id);
        const message = req.body;
        console.log(message);
        const result = await db.collection('couresCollection').findOneAndUpdate(
            { _id: _id },
            { $set: { feedback: message } }
        )
        res.send(result)
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message });

    }
}