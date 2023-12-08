const express = require('express');
const router = express.Router();
const logbookController = require('../controllers/logbookController');

router.get('/toplist', logbookController.toplist);
router.get('/logbook', logbookController.logbook);
router.get('/totalhours', logbookController.totalHours);

module.exports = router;