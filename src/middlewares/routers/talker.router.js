const express = require('express');
const readFs = require('../../utils/readFs');
const validateTalkerId = require('../validateTalkerId');
const validateAge = require('../validateAge');
const validateName = require('../validateName');
const validateTalk = require('../validateTalk');
const validateWatchAt = require('../validateWatchAt');
const auth = require('../auth');
const writeFs = require('../../utils/writeFs');

const router = express.Router();

router.get('/talker', async (req, res) => {
    const talkers = await readFs();
    res.status(200).send(talkers);
});
router.post('/talker', auth, validateName, validateAge, validateTalk, validateWatchAt, async (req, res) => {
    const newTalker = req.body;
    const talkers = await readFs();
    await writeFs([...talkers, { id: talkers.length + 1, ...newTalker }]);
    res.status(200).json({ id: talkers.length + 1, ...newTalker });
});
router.get('/talker/:id', validateTalkerId, async (req, res) => {
    const { id } = req.params;
    const talkers = await readFs();
    const talker = talkers.find((t) => t.id === Number(id));
    res.status(200).send(talker);
});

module.exports = router;