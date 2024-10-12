const express = require('express');
const router = express.Router();
const eventScheduleController = require('../controllers/eventScheduleController');
const verifyToken = require('../middlewares/verifyToken');



// Get event schedule
/**
 * @openapi
 * /api/event:
 *   get:
 *     summary: Retrieve event schedule
 *     tags:
 *       - Event Schedule
 *     responses:
 *       200:
 *         description: Event schedule retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 eventSchedule:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       eventName:
 *                         type: string
 *                       eventDate:
 *                         type: string
 *                         format: date
 *                       circuitName:
 *                         type: string
 *                       location:
 *                         type: string
 *                       country:
 *                         type: string
 *               required:
 *                 - success
 *                 - eventSchedule
 *       500:
 *         description: Error retrieving event schedule
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
 *                   example: Error retrieving event schedule
 */
router.get('/', eventScheduleController.getEventSchedule);

// Add new event to schedule
/**
 * @openapi
 * /api/event/new:
 *   post:
 *     summary: Add new event to schedule
 *     tags:
 *       - Event Schedule
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventName
 *               - eventDate
 *               - circuitName
 *               - location
 *               - country
 *             properties:
 *               eventName:
 *                 type: string
 *                 example: "Monaco Grand Prix"
 *               eventDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-05-28"
 *               circuitName:
 *                 type: string
 *                 example: "Circuit de Monaco"
 *               location:
 *                 type: string
 *                 example: "Monte Carlo"
 *               country:
 *                 type: string
 *                 example: "Monaco"
 *     responses:
 *       201:
 *         description: Event added successfully
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
 *                   example: "Event added successfully"
 *                 event:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     eventName:
 *                       type: string
 *                       example: "Monaco Grand Prix"
 *                     eventDate:
 *                       type: string
 *                       format: date
 *                       example: "2023-05-28"
 *                     circuitName:
 *                       type: string
 *                       example: "Circuit de Monaco"
 *                     location:
 *                       type: string
 *                       example: "Monte Carlo"
 *                     country:
 *                       type: string
 *                       example: "Monaco"
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
 *                   example: "Error adding event to schedule"
 */
router.post('/new', verifyToken, eventScheduleController.addEvent);

module.exports = router;