const validateAmount = (req, res, next) => {
    const { amount } = req.body;
    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Invalid amount' });
    }
    next();
};

module.exports = validateAmount;
