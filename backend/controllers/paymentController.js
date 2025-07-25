const razorpay = require('../config/razorpayConfig');

const createOrder = async (req, res) => {
    const { amount } = req.body;
    const options = {
        amount,
        currency: 'INR',
        receipt: `receipt#${Date.now()}`,
        payment_capture: 1,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Error creating order' });
    }
};

module.exports = {
    createOrder,
};
