const express = require('express');
const readFs = require('../../utils/readFs');
const validateTalkerId = require('../validateTalkerId');

const router = express.Router();

router.get('/talker', async (req, res) => {
    const talkers = await readFs();
    res.status(200).send(talkers);
});
router.get('/talker/:id', validateTalkerId, async (req, res) => {
    const { id } = req.params;
    const talkers = await readFs();
    const talker = talkers.find((t) => t.id === Number(id));
    res.status(200).send(talker);
});

module.exports = router;