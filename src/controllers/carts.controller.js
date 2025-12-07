const { getDB } = require("../config/db");
const sendResponse = require("../utlites/sendResponse");

exports.AddToCart = async (req, res) => {
    const db = getDB();
    try {
        const item = req.body;
        const { cartId, email } = item.cartId
        const result = await db.collection('cartCollection').insertOne(item);
        sendResponse(res, result)
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message })
    }
}
exports.deleteFromCart = async (req, res) => {
    try {
        const db = getDB();
        const couresId = req.body;
        const query = couresId;
        const result = await db.collection('cartCollection').deleteOne(query);
        sendResponse(res,result)
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message })

    }
}
exports.getMyCart = async (req, res) => {
    const db = getDB();
    try {
        const email = req.query.email;
        if (!email) {
            return res.send([])
        }
        const query = { email: email };
        const result = await db.collection('cartCollection').find(query).toArray();
        sendResponse(res, result)
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message })

    }
}