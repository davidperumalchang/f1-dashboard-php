const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

// Get drivers by team
router.get('/:team_id', driverController.getDriversByTeam);

module.exports = router;
