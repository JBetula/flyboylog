const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

router.get('/routesByNrOfsectors', dataController.routesByNrOfsectors);

module.exports = router;