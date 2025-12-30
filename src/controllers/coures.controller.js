const { getDB } = require("../config/db");
const { ObjectId } = require('mongodb');
const sendResponse = require("../utlites/sendResponse");


exports.getCourseById = async (req, res) => {
    const db = getDB();
    const id = req.params.id;

    try {
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ status: "error", message: "Invalid course ID" });
        }

        const _id = new ObjectId(id);
        const course = await db.collection('couresCollection').findOne({ _id });

        if (!course) {
            return res.status(404).json({ status: "error", message: "Course not found" });
        }

        sendResponse(res, course);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: err.message });
    }
};


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
    const db = getDB();
    const courseId = req.params.courseId;
    try {
        const contentCollection = db.collection('content-collections');
        const doc = await contentCollection.findOne({ courseId });
        if (!doc) return res.status(404).json({ message: "No content found" });
        sendResponse(res, doc);
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
        // const isClubMember = await clubMemberCollection.findOne({ email: email });

        let enrolledClassDetails;
        enrolledClassDetails = await db.collection('couresCollection').find({}).toArray();
        const enrolledClasses = await db.collection('paymentCollection').find({ email: email }).toArray();
        const enrolledClassIds = enrolledClasses.map(item => new ObjectId(item.couresId));
        enrolledClassDetails = await db.collection('couresCollection').find({
            _id: { $in: enrolledClassIds }
        }).toArray();

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