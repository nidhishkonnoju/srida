const express = require('express');
const router = express.Router();

// Temporary in-memory cart (we'll replace with database later)
let cart = [];

router.get('/', (req, res) => {
  res.json(cart);
});

router.post('/add', (req, res) => {
  const item = req.body;
  cart.push(item);
  res.json({ message: 'Item added to cart', cart });
});

module.exports = router;