const { getDB } = require("../config/db");
const sendResponse = require("../utlites/sendResponse");
const { ObjectId } = require('mongodb')


exports.getMyAddedClass = async (req, res) => {
    try {
        const db = getDB();
        const email = req.query.email;
        const query = { instructorEmail: email }
        const result = await db.collection('couresCollection').find(query).toArray();
        sendResponse(res,result);
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message })

    }
}



exports.makeInstructor = async (req, res) => {
    try {
        const db = getDB();
        const id = req.params.id;
        const _id = new ObjectId(id)
        const result = await db.collection('usersCollection').findOneAndUpdate(
            { _id: _id },
            { $set: { role: 'instructor' } }
        )
        sendResponse(res, result)
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message })
    }
}



exports.getAllInstructor = async (req, res) => {
    const db = getDB();
    try {
        const instructors = await db.collection('usersCollection').aggregate([
            {
                $group: {
                    _id: "$instructorEmail",
                    instructor: { $first: "$$ROOT" }
                }
            },
            {
                $replaceRoot: { newRoot: "$instructor" }
            }
        ]).toArray();

        sendResponse(res, instructors)
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.getTopInstructor = async (req, res) => {
    try {
        const db = getDB();
        const topinstructors = await db.collection('couresCollection').aggregate([
            {
                $group: {
                    _id: '$teacherId',
                    totalEnrollments: { $sum: '$enrolled' },
                    instructorName: { $push: { instructor: '$instructorName' } },
                    instructorImage: { $push: { image: '$instructorImage' } }
                },
            },
            { $sort: { totalEnrollments: -1 } },
            { $limit: 6 }]).toArray();

        sendResponse(res, topinstructors)
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message })
    }
}

// TODO: Make instrctor reDesgin db
