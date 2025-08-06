const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, refundPayment } = require('../controllers/paymentController');

const validateAmount = require('../middlewares/validateAmount');



router.post('/create-order', validateAmount, createOrder);

router.post('/verify', verifyPayment);

router.post('/refund', refundPayment);

router.get('/get-key', (req, res) => {
    res.json({ key: process.env.RAZORPAY_KEY_ID });
});


module.exports = router;
