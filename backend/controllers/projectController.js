const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/projects.json');

function loadProjectsFromFile() {
    if (!fs.existsSync(dataPath)) {
        return [];
    }

    try {
        const raw = fs.readFileSync(dataPath, 'utf8');
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed.projects) ? parsed.projects : [];
    } catch (error) {
        console.error('Failed to load project data:', error);
        return [];
    }
}

const projects = loadProjectsFromFile();

exports.getAllProjects = (req, res) => {
    res.json({
        success: true,
        projects
    });
};
