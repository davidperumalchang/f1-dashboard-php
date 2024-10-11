const db = require('../database/db');

// API ROUTES

// Retrieve drivers based on team
exports.getDriversByTeam = async (req, res) => {
    const { team_id } = req.params;
    try {
        const result = await db.query('SELECT * FROM f1_app.drivers WHERE team_id = $1', [team_id]);
        const drivers = result.rows;
        res.json({ success: true, drivers });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving drivers by team.' });
    }
};

// END API ROUTES


// HELPER FUNCTIONS

// Retrieve driver by id
exports.getDriverById = async (driverId) => {
    const result = await db.query('SELECT * FROM f1_app.drivers WHERE id = $1', [driverId]);
    return result.rows[0];
};


// END HELPER FUNCTIONS