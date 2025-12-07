const { getDB } = require("../config/db");
const { ObjectId } = require('mongodb')
const sendResponse = require("../utlites/sendResponse");
const SSLCommerzPayment = require('sslcommerz-lts')

exports.getPaymentHistory = async (req, res) => {
    try {
        const db = getDB();
        const email = req.query.email;
        const query = { email: email };
        const paymentHistory = await db.collection('paymentCollection').find(query).sort({ date: -1 }).toArray();
        sendResponse(res, paymentHistory)
    } catch (error) {
        res.status(500).send({ status: "error", message: err.message })

    }
}
//payments
exports.payment = async (req, res) => {
    try {
        const db = getDB();
        const payment = req.body;
        const result = await db.collection('paymentCollection').insertOne(payment);
        console.log(payment);
        if (result.insertedId) {
            const cartId = payment.couresId;
            const deleteResult = await db.collection('cartCollection').deleteOne({ cartId: cartId })

            if (deleteResult.deletedCount === 1) {
                console.log('Item removed from cartCollection');
                const couresId = payment.couresId;
                const updateResult = await db.collection('couresCollection').updateOne(
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
        sendResponse(res, result)
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message })
    }
}
//payment Intent
exports.createPaymentIntent = async (req, res) => {
    try {
        const { price } = req.body;
        const amount = price * 100;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method_types: ['card']
        });
        res.send({
            clientSecret: paymentIntent.client_secret
        })
    } catch (err) {
        res.status(500).send({ status: "error", message: err.message })

    }
}

exports.sslPay = async (req, res) => {
    const stripe = require('stripe')(process.env.DB_PAYMENT_KEY)


    // SSL commerce.
    const store_id = process.env.ssl_store_id;
    const store_passwd = process.env.ssl_store_pass;
    const is_live = false;
    try {
        const tran_id = new ObjectId().toString();
        // console.log(req.body);
        const { price, email, name, cartId, _id } = req.body;
        // calculete Price On BDT
        const bdtPrice = 110 * price;
        const data = {
            total_amount: bdtPrice,
            currency: 'BDT',
            tran_id: tran_id, // use unique tran_id for each api call
            success_url: 'abc6557ca5672c76@ssl/success',
            fail_url: 'https://speakup-ivory.vercel.app/fail',
            cancel_url: 'https://speakup-ivory.vercel.app/cancel',
            ipn_url: 'https://speakup-ivory.vercel.app/ipn',
            shipping_method: 'Online Coures',
            product_name: name,
            product_category: "Online Coures",
            product_profile: 'Coures',
            cus_email: email,
            cus_phone: '1234567890',
            product_id: cartId,
            couresId: _id,
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        console.log(data);
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        sslcz.init(data).then(apiResponse => {
            console.log(apiResponse);
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL
            res.send({ url: GatewayPageURL })
            console.log('Redirecting to: ', GatewayPageURL)
        });

    } catch (err) {
        res.status(500).send({ status: "error", message: err.message })

    }
}