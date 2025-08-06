const razorpay = require('../config/razorpayConfig');
const crypto = require('crypto');

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


const verifyPayment = (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature)    {
        return res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
        return res.status(400).json({ success: false, message: "Invalid signature" });
    }
};



const refundPayment = async (req, res) => {
    const { payment_id, amount } = req.body; // amount is optional

    try {
        const refundOptions = {
            payment_id,
        };

        if (amount) {
            refundOptions.amount = amount; // optional for partial refund
        }

        const refund = await razorpay.payments.refund(refundOptions);
        res.status(200).json({ success: true, message: "Refund successful", refund });
    } catch (error) {
        console.error("Refund error:", error);
        res.status(500).json({ success: false, message: "Refund failed", error: error.message });
    }
};


module.exports = {
    createOrder,
    verifyPayment,
    refundPayment
};
