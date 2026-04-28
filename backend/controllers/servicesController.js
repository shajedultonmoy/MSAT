const fs = require('fs');
const path = require('path');

function loadServicesFromFile() {
    const filePath = path.join(__dirname, '../data/services.json');
    if (!fs.existsSync(filePath)) {
        return { services: [], process: [], cta: {} };
    }

    try {
        const raw = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(raw);
    } catch (error) {
        console.error('Failed to load services data:', error);
        return { services: [], process: [], cta: {} };
    }
}

const servicesData = loadServicesFromFile();

exports.getServices = (req, res) => {
    res.json({
        success: true,
        ...servicesData
    });
};
