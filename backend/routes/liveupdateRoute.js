const express = require('express');
const router = express.Router();
const liveupdateController = require('../controllers/liveupdateController');

// Get live update
/**
 * @openapi
 * /api/liveupdate:
 *   get:
 *     summary: Get live update
 *     tags:
 *       - Live Update
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 liveUpdate:
 *                   type: object
 *                   properties:
 *                     // Add specific properties of the live update here
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
 *                   example: Error retrieving live update
 */
router.get('/', liveupdateController.getLiveUpdate);

module.exports = router;
