const { getDB } = require("../config/db");
const sendResponse = require("../utlites/sendResponse");

exports.getAllInstructor = async (req, res) => {
    const db = getDB();
    try {
        const instructors = await db.collection('couresCollection').aggregate([
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

        sendResponse(res,instructors)
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