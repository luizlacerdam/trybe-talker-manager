const express = require('express');
const readFs = require('../../utils/readFs');
const validateTalkerId = require('../validateTalkerId');
const validateAge = require('../validateAge');
const validateName = require('../validateName');
const validateTalk = require('../validateTalk');
const validateWatchAt = require('../validateWatchAt');
const validateRate = require('../validateRate');

const auth = require('../auth');
const writeFs = require('../../utils/writeFs');

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

router.post('/talker', 
auth, 
validateName, 
validateAge, 
validateTalk,
validateWatchAt,
validateRate,
async (req, res) => {
    const newTalker = req.body;
    const talkers = await readFs();
    await writeFs([...talkers, { id: talkers.length + 1, ...newTalker }]);
    res.status(201).json({ id: talkers.length + 1, ...newTalker });
});

router.put('/talker/:id', auth, 
validateName, 
validateAge, 
validateTalk,
validateWatchAt,
validateRate, async (req, res) => {
    const { id } = req.params;
    const newTalker = req.body;
    const talkers = await readFs();
    const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
    talkers[talkerIndex] = { id: +id, ...newTalker };
    await writeFs(talkers);
    res.status(200).json(talkers[talkerIndex]);
});

router.delete('/talker/:id', auth, async (req, res) => {
    const { id } = req.params;
    const talkers = await readFs();
    const talkerIndex = talkers.findIndex((talker) => talker.id === Number(id));
    talkers.splice(talkerIndex, 1);
    await writeFs(talkers);
    res.status(204).end();
});

router.get('/search', auth, async (req, res) => {
    const { q } = req.query;
    const talkers = await readFs();
    if (!q) return res.status(200).json(talkers);
    const searchResult = talkers.filter((talker) => talker.name
    .toLowerCase().includes(q.toLowerCase()));
    console.log(searchResult);
    res.status(200).json(searchResult);
});

module.exports = router;