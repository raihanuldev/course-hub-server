const { getDB } = require("../config/db");
const sendResponse = require("../utlites/sendResponse");
const { ObjectId } = require('mongodb')

exports.getAllUser = async (req, res) => {
    try {
        const Db = getDB();

        // Pagination inputs
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        // Fetch data with pagination
        const users = await Db
            .collection('usersCollection')
            .find()
            .skip(skip)
            .limit(limit)
            .toArray();

        // Total count for metadata
        const totalUsers = await Db.collection('usersCollection').countDocuments();

        const responseData = {
            page,
            limit,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            users
        };

        sendResponse(res, responseData);

    } catch (err) {
        res.status(500).send({ status: "error", message: err.message });
    }
};


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
            return res.send({ status: "success", message: 'User already exiting on Database' })
        }
        const result = await Db.collection('usersCollection').insertOne(user);
        sendResponse(res, result);
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message });
    }
}

exports.MakeAdmin = async (req, res) => {
    const Db = getDB();
    const id = req.params.id;
    const _id = new ObjectId(id)
    const result = await Db.collection('usersCollection').findOneAndUpdate(
        { _id: _id },
        { $set: { role: 'admin' } }
    )
    res.send(result)
}
exports.isClubMember = async (req, res) => {
    const db = getDB();
    const email = req.query.email;
    try {
        const member = await db.collection('clubMemberCollection').findOne({ email });
        res.send({ isMember: !!member });
    } catch (error) {
        console.error(error);
        res.status(500).send({ isMember: false });
    }
}
exports.GetAllClubMembers = async (req, res) => {
    const db = getDB();
    try {
        const members = await db.collection('clubMemberCollection').find().toArray();
        res.send(members);
    } catch (error) {
        console.error("Failed to fetch club members:", error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}

exports.addClubMember = async (req, res) => {
    const db = getDB();
    const { email } = req.body;

    if (!email) {
        return res.status(400).send({ message: "Email is required" });
    }

    try {
        // Check if already exists
        const existing = await db.collection('clubMemberCollection').findOne({ email });
        if (existing) {
            return res.status(200).send({ message: "Already a club member" });
        }

        // Insert new member
        const result = await clubMemberCollection.insertOne({
            email,
            role: "member"
        });

        res.status(201).send({ message: "Added to club members", insertedId: result.insertedId });
    } catch (error) {
        console.error("Failed to add club member:", error);
        res.status(500).send({ message: "Server Error" });
    }
}