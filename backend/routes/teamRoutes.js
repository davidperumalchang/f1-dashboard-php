const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const verifyToken = require('../middlewares/verifyToken');

// Get teams
/**
 * @openapi
 * /api/team:
 *   get:
 *     summary: Retrieve teams
 *     tags:
 *       - Team
 *     responses:
 *       200:
 *         description: Teams retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 teams:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       teamName:
 *                         type: string
 *                       points:
 *                         type: number
 *                       wins:
 *                         type: number
 *                       podiums:
 *                         type: number
 *               required:
 *                 - success
 *                 - teams
 *       500:
 *         description: Error retrieving teams
 */
router.get('/', teamController.getTeams);

// Add new team
// requires admin token
/**
 * @openapi
 * /api/team/new:
 *   post:
 *     summary: Add new team
 *     tags:
 *       - Team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamName:
 *                 type: string
 *               points:
 *                 type: number
 *               wins:
 *                 type: number
 *               podiums:
 *                 type: number
 *     responses:
 *       200:
 *         description: Team added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       500:
 *         description: Error adding team
 */
router.post('/new', verifyToken, teamController.addTeam);

// Update team standings
/**
 * @openapi
 * /api/team/update:
 *   put:
 *     summary: Update team standings
 *     tags:
 *       - Team
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamName:
 *                 type: string
 *               points:
 *                 type: number
 *               wins:
 *                 type: number
 *               podiums:
 *                 type: number
 *     responses:
 *       200:
 *         description: Team standings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *       500:
 *         description: Error updating team standings
 */
router.put('/update', verifyToken, teamController.updateTeamStandings);

// Get team standings
/**
 * @openapi
 * /api/team/standings:
 *   get:
 *     summary: Retrieve team standings
 *     tags:
 *       - Team
 *     responses:
 *       200:
 *         description: Team standings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 teamStandings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       teamName:
 *                         type: string
 *                       points:
 *                         type: number
 *                       wins:
 *                         type: number
 *                       podiums:
 *                         type: number
 *               required:
 *                 - success
 *                 - teamStandings
 *       500:
 *         description: Error retrieving team standings
 */
router.get('/standings', teamController.getTeamStandings);

// Retrieve team details
/**
 * @openapi
 * /api/team/{teamName}:
 *   get:
 *     summary: Retrieve team details
 *     tags:
 *       - Team 
 *     parameters:
 *       - name: teamName
 *         in: path
 *         description: Name of the team
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Team details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 teamDetails:
 *                   type: object
 *
 *       500:
 *         description: Error retrieving team details
 */
router.get('/:team_name', teamController.getTeamDetails);


module.exports = router;