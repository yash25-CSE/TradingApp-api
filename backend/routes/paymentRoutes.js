const express = require('express');
const { createOrder , verifyPayment} = require('../controllers/paymentController');
const validateAmount = require('../middlewares/validateAmount');
const crypto = require('crypto');

const router = express.Router();

router.post('/create-order', validateAmount, createOrder);

router.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const key_secret = process.env.RAZORPAY_SECRET || 'your_razorpay_secret';

  const generated_signature = crypto
    .createHmac('sha256', key_secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    return res.status(200).json({ success: true, message: "Payment verified" });
  } else {
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }
});

router.get('/get-key', (req, res) => {
    res.json({ key: process.env.RAZORPAY_KEY_ID });
});


module.exports = router;
