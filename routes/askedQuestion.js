const express = require('express');
const router = express.Router();
const AskedQuestion = require('../models/AskedQuestion');

router.post('/', async (req, res) => {
  try {
    const faq = new AskedQuestion(req.body);
    await faq.save();
    res.status(201).send(faq);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/', async (req, res) => {
  const faqs = await AskedQuestion.find().sort({ date: -1 });
  res.send(faqs);
});

router.delete('/:id', async (req, res) => {
  try {
    await AskedQuestion.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;