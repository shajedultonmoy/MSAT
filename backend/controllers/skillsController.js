const fs = require('fs');
const path = require('path');

function loadSkillsFromFile() {
    const filePath = path.join(__dirname, '../data/skills.json');
    if (!fs.existsSync(filePath)) {
        return { skills: [], certifications: [] };
    }

    try {
        const raw = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(raw);
    } catch (error) {
        console.error('Failed to load skills data:', error);
        return { skills: [], certifications: [] };
    }
}

const skillsData = loadSkillsFromFile();

exports.getSkills = (req, res) => {
    res.json({
        success: true,
        ...skillsData
    });
};
