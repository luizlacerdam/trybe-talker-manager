const readFs = require('../utils/readFs');

module.exports = async (req, res, next) => {
    const talkers = await readFs();
    const id = Number(req.params.id);
    if (!talkers.some((talker) => talker.id === id)) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    next();
};