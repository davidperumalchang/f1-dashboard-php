const express = require('express');
const router = express.Router();
const liveupdateController = require('../controllers/liveupdateController');

// Get live update
router.get('/', liveupdateController.getLiveUpdate);

module.exports = router;
