const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

// Get drivers by team
/**
 * @openapi
 * tags:
 *   name: Drivers
 * 
 * /api/drivers/{team_id}:
 *   get:
 *     summary: Get drivers by team
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: team_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the team
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   team_id:
 *                     type: integer
 *       404:
 *         description: Team not found
 *       500:
 *         description: Server error
 */
router.get('/:team_id', driverController.getDriversByTeam);

module.exports = router;
