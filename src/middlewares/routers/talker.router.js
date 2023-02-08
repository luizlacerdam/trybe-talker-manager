const express = require('express');
const readFs = require('../../utils/readFs');

const router = express.Router();

router.get('/talker', async (req, res) => {
    const talker = await readFs();
    res.status(200).send(talker);
});

module.exports = router;