const express = require('express');
const generateToken = require('../../utils/generateToken');

const router = express.Router();

router.post('/login', (req, res) => {
    res.status(200).json({ token: generateToken() });
});

module.exports = router;