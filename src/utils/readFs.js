const fs = require('fs').promises;
const path = require('path');

const talker = path.resolve(__dirname, '../talker.json');

module.exports = async () => {
    try {
        const data = await fs.readFile(talker);
        return JSON.parse(data);
    } catch (error) {
        console.error(`Arquivo não pôde ser lido: ${error}.`);
    }
};