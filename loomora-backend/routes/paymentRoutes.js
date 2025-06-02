
const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();
const crypto = require('crypto');

router.post('/create-order', async (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: req.body.amount * 100,
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({ orderId: response.id });
  } catch (err) {
    res.status(500).send('Error creating order');
  }
});

router.post('/verify', (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(order_id + '|' + payment_id);
  const generated_signature = hmac.digest('hex');
  if (generated_signature === signature) {
    res.json({ status: 'Payment Verified' });
  } else {
    res.status(400).json({ status: 'Invalid Signature' });
  }
});

module.exports = router;
