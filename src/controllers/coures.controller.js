const { getDB } = require("../config/db");
const { ObjectId } = require('mongodb');
const sendResponse = require("../utlites/sendResponse");

exports.addNewCoures = async (req, res) => {
    const db = getDB();
    try {
        const item = req.body;
        const result = await db.collection('couresCollection').insertOne(item);
        sendResponse(res, result)
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message });
    }
}
// Add New Module
exports.AddNewModule = async (req, res) => {
    const db = getDB();
    const courseId = req.params.courseId;
    const newModule = req.body;
    console.log("Module Details-> ", courseId, newModule);
    try {
        const result = await db.collection('content-collections').updateOne(
            { courseId: courseId },
            { $push: { content: newModule } },
            { upsert: true }
        );
        sendResponse(res, result);
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message });
    }
}

exports.GetContent = async (req, res) => {
    const courseId = req.params.courseId;
    try {
        const doc = await contentCollection.findOne({ courseId });
        if (!doc) return res.status(404).json({ message: "No content found" });
        res.json(doc);
    } catch (err) {
        res.status(500).json({ error: "Internal server error", err });
    }
}

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

exports.enrolledCoures = async (req, res) => {
    const db = getDB();
    const email = req.query.email;

    try {
        // Check if email exists in clubMemberCollection
        const isClubMember = await clubMemberCollection.findOne({ email: email });

        let enrolledClassDetails;

        if (isClubMember) {
            // If club member, give access to all courses
            enrolledClassDetails = await db.collection('couresCollection').find({}).toArray();
        } else {
            // If not a club member, fetch enrolled classes from paymentCollection
            const enrolledClasses = await db.collection('paymentCollection').find({ email: email }).toArray();

            const enrolledClassIds = enrolledClasses.map(item => new ObjectId(item.couresId));

            enrolledClassDetails = await db.collection('couresCollection').find({
                _id: { $in: enrolledClassIds }
            }).toArray();
        }
        sendResponse(res, enrolledClassDetails)

    } catch (error) {
        res.status(500).send(error.message);
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

exports.deniedCoures = async (req, res) => {
    try {
        const db = getDB();
        const _id = new ObjectId(req.params.id)
        const result = await db.collection('couresCollection').findOneAndUpdate(
            { _id: _id },
            { $set: { status: 'denied' } }
        )
        sendResponse(res, result)
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message });
    }
}