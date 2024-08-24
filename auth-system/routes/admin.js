
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();


router.get('/admin1', auth('admin'), (req, res) => {
  res.json({ msg: 'Welcome to the admin dashboard' });
});

module.exports = router;
