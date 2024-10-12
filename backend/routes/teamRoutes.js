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
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       team_name:
 *                         type: string
 *               required:
 *                 - success
 *                 - teams
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error retrieving teams
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
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - team_name
 *               - points
 *               - wins
 *               - podiums
 *             properties:
 *               team_name:
 *                 type: string
 *                 example: "Red Bull Racing"
 *               points:
 *                 type: number
 *                 example: 287
 *               wins:
 *                 type: number
 *                 example: 5
 *               podiums:
 *                 type: number
 *                 example: 8
 *     responses:
 *       201:
 *         description: Team added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Team added successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access"
 *       500:
 *         description: Error adding team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error adding team"
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
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - team_name
 *               - points
 *               - wins
 *               - podiums
 *             properties:
 *               team_name:
 *                 type: string
 *                 example: "Red Bull Racing"
 *               points:
 *                 type: number
 *                 example: 287
 *               wins:
 *                 type: number
 *                 example: 5
 *               podiums:
 *                 type: number
 *                 example: 8
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
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Team standings updated successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access"
 *       500:
 *         description: Error updating team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error updating team"
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
 *                   example: true
 *                 teamStandings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       team_name:
 *                         type: string
 *                         example: "Red Bull Racing"
 *                       points:
 *                         type: number
 *                         example: 287
 *                       wins:
 *                         type: number
 *                         example: 5
 *                       podiums:
 *                         type: number
 *                         example: 8
 *               required:
 *                 - success
 *                 - teamStandings
*       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *       500:
 *         description: Error retrieving team standings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error retrieving team standings"
 */
router.get('/standings', teamController.getTeamStandings);

// Retrieve team details
/**
 * @openapi
 * /api/team/{id}:
 *   get:
 *     summary: Retrieve team details
 *     tags:
 *       - Team 
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the team
 *         required: true
 *         schema:
 *           type: integer
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
 *                   example: true
 *                 teamDetails:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     team_name:
 *                       type: string
 *                       example: "Red Bull Racing"
 *                     points:
 *                       type: number
 *                       example: 287
 *                     wins:
 *                       type: number
 *                       example: 5
 *                     podiums:
 *                       type: number
 *                       example: 8
 *               required:
 *                 - success
 *                 - teamDetails
*       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *       500:
 *         description: Error adding event to schedule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error retrieving team"
 */
router.get('/:id', teamController.getTeamDetails);


module.exports = router;