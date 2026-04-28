const fs = require('fs');
const path = require('path');

function loadIntroductionFromFile() {
    const filePath = path.join(__dirname, '../data/introduction.json');
    if (!fs.existsSync(filePath)) {
        return { stats: [], cards: [], timeline: [], cta: {} };
    }

    try {
        const raw = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(raw);
    } catch (error) {
        console.error('Failed to load introduction data:', error);
        return { stats: [], cards: [], timeline: [], cta: {} };
    }
}

const introData = loadIntroductionFromFile();

exports.getIntroduction = (req, res) => {
    res.json({
        success: true,
        ...introData
    });
};
