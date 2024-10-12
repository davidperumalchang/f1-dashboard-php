const db = require('../database/db');

// API ROUTES

// Retrieve teams
exports.getTeams = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM f1_app.team');
        const teams = result.rows;
        res.json({ success: true, teams });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving team.' });
    }
};

// Retrieve team standings
exports.getTeamStandings = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM f1_app.team ORDER BY points DESC');
        const teamStandings = result.rows;
        res.json({ success: true, teamStandings });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving team standings.' });
    }
};

// Retrieve team details
exports.getTeamDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM f1_app.team WHERE id = $1', [id]);
        const teamDetails = result.rows[0];
        res.json({ success: true, teamDetails });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving team details.' });
    }
};

// Add new team
exports.addTeam = async (req, res) => {
    const { team_name, points, wins, podiums } = req.body;
    try {
        await db.query(
            'INSERT INTO f1_app.team (team_name, points, wins, podiums) VALUES ($1, $2, $3, $4)',
            [team_name, points, wins, podiums]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding team.' });
    }
};

// Update team standings
exports.updateTeamStandings = async (req, res) => {
    const { team_name, points, wins, podiums } = req.body;
    try {
        await db.query(
            'UPDATE f1_app.team SET points = $1, wins = $2, podiums = $3 WHERE team_name = $4',
            [points, wins, podiums, team_name]
        );

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating team standings.' });
    }
};

// END API ROUTES


// HELPER FUNCTIONS

// Retrieve team by id
exports.getTeamById = async (teamId) => {
    const result = await db.query('SELECT * FROM f1_app.team WHERE id = $1', [teamId]);
    return result.rows[0];
};

// END HELPER FUNCTIONS
