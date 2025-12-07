// utils/sendResponse.js
module.exports = sendResponse = (res, result) => {
    if (!result) {
        return res.status(404).send({ status: "NULL", message: "No data found" });
    }
    return res.status(200).send({ status: "success", data: result });
};
