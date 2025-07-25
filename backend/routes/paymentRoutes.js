const express = require('express');
const { createOrder } = require('../controllers/paymentController');
const validateAmount = require('../middlewares/validateAmount');

const router = express.Router();

router.post('/create-order', validateAmount, createOrder);

router.get('/get-key', (req, res) => {
    res.json({ key: process.env.RAZORPAY_KEY_ID });
});


module.exports = router;
