const express = require('express');
const readFs = require('../../utils/readFs');

const router = express.Router();

router.get('/talker', async (req, res) => {
    const talker = await readFs();
    console.log(talker);
});

module.exports = router;