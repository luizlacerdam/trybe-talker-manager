const express = require('express');

const router = express.Router();

router.get('/talker', (req, res) => {
    res.status(200).send('Funfando');
});

module.exports = router;