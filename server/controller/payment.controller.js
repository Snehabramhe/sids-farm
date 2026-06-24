require('dotenv').config({ path: __dirname + '/../.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const makePayment = async (request, response) => {
    try {
        const {amount, currency} = request.body;
        const paymentIntent = await stripe.paymentIntents.create({
            // Stripe requires a positive integer amount in the smallest currency
            // unit; round defensively so a fractional amount never causes a 500.
            amount: Math.round(amount),
            currency,
        });
        return response.json({clientSecret: paymentIntent.client_secret});
    } catch (error) {
        response.status(500).json({error: error.message});
    }
}

module.exports = {
    makePayment
}