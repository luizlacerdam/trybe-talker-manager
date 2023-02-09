const fs = require('fs').promises;
const path = require('path');

const talkers = path.resolve(__dirname, '../talker.json');

module.exports = async (talker) => {
    try {
       await fs.writeFile(talkers, JSON.stringify(talker));
    } catch (error) {
        console.error(`Arquivo não pôde ser lido: ${error}`);
    }
};