const express = require('express');
const app = express();


require('dotenv').config();
const port = process.env.PORT || 5000;


async function run() {
  try {
    const couresCollection = client.db('Language').collection('couresCollection');
    const usersCollection = client.db('Language').collection('usersCollection');
    const cartCollection = client.db('Language').collection('cartCollection');
    const paymentCollection = client.db('Language').collection('paymentCollection');
    const contentCollection = client.db('Language').collection('content-collections');
    const clubMemberCollection = client.db('Language').collection('clubMemberCollection');

    // Make admin Role
    app.put('/make-admin/:id', async (req, res) => {
      const id = req.params.id;
      const _id = new ObjectId(id)
      // console.log(_id);
      const result = await usersCollection.findOneAndUpdate(
        { _id: _id },
        { $set: { role: 'admin' } }
      )
      res.send(result)
    })
    // Add a club member if not already exists
    app.post('/add-club-member', async (req, res) => {
      const { email } = req.body;

      if (!email) {
        return res.status(400).send({ message: "Email is required" });
      }

      try {
        // Check if already exists
        const existing = await clubMemberCollection.findOne({ email });
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
    });
    //get all club members
    app.get('/club-members', async (req, res) => {
      try {
        const members = await clubMemberCollection.find().toArray();
        res.send(members);
      } catch (error) {
        console.error("Failed to fetch club members:", error);
        res.status(500).send({ error: 'Internal Server Error' });
      }
    });

    //is club member check
    app.get('/is-club-member', async (req, res) => {
      const email = req.query.email;
      try {
        const member = await clubMemberCollection.findOne({ email });
        res.send({ isMember: !!member });
      } catch (error) {
        console.error(error);
        res.status(500).send({ isMember: false });
      }
    });
  } finally {
  }
}