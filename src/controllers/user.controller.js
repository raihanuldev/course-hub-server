
exports.getUser = async (req, res) => {
    const email = req.query.email;
    const query = { email: email }
    // console.log(query);
    // const result = await usersCollection.findOne(query);
    res.send("got it user by ")
}