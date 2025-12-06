const express = require('express');
const app = express();
const SSLCommerzPayment = require('sslcommerz-lts')

require('dotenv').config();
const port = process.env.PORT || 5000;
const stripe = require('stripe')(process.env.DB_PAYMENT_KEY)


// SSL commerce.
const store_id = process.env.ssl_store_id;
const store_passwd = process.env.ssl_store_pass;
const is_live = false;

async function run() {
  try {
    const couresCollection = client.db('Language').collection('couresCollection');
    const usersCollection = client.db('Language').collection('usersCollection');
    const cartCollection = client.db('Language').collection('cartCollection');
    const paymentCollection = client.db('Language').collection('paymentCollection');
    const contentCollection = client.db('Language').collection('content-collections');
    const clubMemberCollection = client.db('Language').collection('clubMemberCollection');

    // Stripe Payment  Releted Apis... plz igonore for /payments path. cz at frist i added stripe
    app.post('/payments', async (req, res) => {
      const payment = req.body;
      const result = await paymentCollection.insertOne(payment);
      console.log(payment);
      if (result.insertedId) {
        const cartId = payment.couresId;
        const deleteResult = await cartCollection.deleteOne({ cartId: cartId })

        if (deleteResult.deletedCount === 1) {
          console.log('Item removed from cartCollection');
          const couresId = payment.couresId;
          const updateResult = await couresCollection.updateOne(
            { _id: new ObjectId(couresId) },
            {
              $inc: {
                enrolled: 1,
                availableSeats: -1
              }
            }
          );

          if (updateResult.modifiedCount === 1) {
            console.log('Enrolled count increased in couresCollection');
          } else {
            console.log('Failed to increase enrolled count in couresCollection');
          }
        } else {
          console.log('Item not found in cartCollection');
        }
      }

      res.send(result)

    })

    app.get('/enrolled-classes', async (req, res) => {
      const email = req.query.email;
      console.log('Request email:', email);

      try {
        // Check if email exists in clubMemberCollection
        const isClubMember = await clubMemberCollection.findOne({ email: email });

        let enrolledClassDetails;

        if (isClubMember) {
          // If club member, give access to all courses
          enrolledClassDetails = await couresCollection.find({}).toArray();
        } else {
          // If not a club member, fetch enrolled classes from paymentCollection
          const enrolledClasses = await paymentCollection.find({ email: email }).toArray();

          const enrolledClassIds = enrolledClasses.map(item => new ObjectId(item.couresId));

          enrolledClassDetails = await couresCollection.find({
            _id: { $in: enrolledClassIds }
          }).toArray();
        }

        console.log('Enrolled Classes:', enrolledClassDetails);
        res.send(enrolledClassDetails);

      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });


    // Update Denied Status
    app.put('/classDenied/:id', async (req, res) => {
      const _id = new ObjectId(req.params.id)
      const result = await couresCollection.findOneAndUpdate(
        { _id: _id },
        { $set: { status: 'denied' } }
      )
      res.send(result)
    })

    app.post('/newclass', async (req, res) => {
      const item = req.body;
      console.log(item)
      const result = await couresCollection.insertOne(item);
      res.send(result)
    })
    
    // Add Module
    app.patch("/content-collections/:courseId", async (req, res) => {
      const courseId = req.params.courseId;
      const newModule = req.body;
      console.log(courseId, newModule);
      try {
        const result = await contentCollection.updateOne(
          { courseId: courseId },
          { $push: { content: newModule } },
          { upsert: true }
        );
        res.send({ success: true, result });
      } catch (err) {
        res.status(500).send({ success: false, message: "Database error", error: err });
      }
    });

    //get content by courseId
    app.get("/content-collections/:courseId", async (req, res) => {
      const courseId = req.params.courseId;
      try {
        const doc = await contentCollection.findOne({ courseId });
        if (!doc) return res.status(404).json({ message: "No content found" });
        res.json(doc);
      } catch (err) {
        res.status(500).json({ error: "Internal server error", err });
      }
    });

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