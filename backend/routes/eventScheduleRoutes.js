const express = require('express');
const router = express.Router();
const eventScheduleController = require('../controllers/eventScheduleController');
const verifyToken = require('../middlewares/verifyToken');



// Get event schedule
/**
 * @openapi
 * /api/event-schedule:
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
 *                       eventName:
 *                         type: string
 *                       eventDate:
 *                         type: string
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
 */
router.get('/', eventScheduleController.getEventSchedule);

// Add new event to schedule
/**
 * @openapi
 * /api/event-schedule/new:
 *   post:
 *     summary: Add new event to schedule
 *     tags:
 *       - Event Schedule
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventName:
 *                 type: string
 *               eventDate:
 *                 type: string 
 *               circuitName:
 *                 type: string
 *               location:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean  
 *       500:
 *         description: Error adding event to schedule
 */
router.post('/new', verifyToken, eventScheduleController.addEvent);

module.exports = router;