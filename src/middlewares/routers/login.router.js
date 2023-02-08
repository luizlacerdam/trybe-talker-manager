const express = require('express');
const generateToken = require('../../utils/generateToken');
const validateEmail = require('../validateEmail');

const router = express.Router();

router.post('/login', validateEmail, (req, res) => {
    res.status(200).json({ token: generateToken() });
});

module.exports = router;